const express = require('express');
const funcionario = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para obter todos os funcionários com seus respectivos dados
funcionario.get('/funcionario', (req, res) => {
    connection.query(
        'SELECT DISTINCT idFuncionario, NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, Funcao FROM Pessoa INNER JOIN Funcionario ON Pessoa.idPessoa = Funcionario.Pessoa_idPessoa;',
        (error, results) => {
            if (error) {
                return res.send(error);
            } else {
                return res.json({
                    data: results
                });
            }
        }
    );
});

// Rota para obter um funcionário específico
funcionario.get('/funcionario/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM Funcionario WHERE idFuncionario = ?',
        [id],
        (error, results) => {
            if (error) {
                return res.send(error);
            } else {
                return res.json({
                    data: results
                });
            }
        }
    );
});

// Inicia a transação
funcionario.post('/funcionario/add', jsonParser, (req, res) => {
    const {
        NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, Funcao } = req.body

    // Inicia a transação
    connection.beginTransaction(function (err) {
        if (err) {
            res.status(500).send('Erro ao iniciar a transação.');
            return;
        }

        // Insere a pessoa na tabela Pessoa
        connection.query("INSERT INTO Pessoa (NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, TipoUsuario) VALUES (?,?,?,?,?,?,?,?,'Funcionário');", [NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha], function (error, results, fields) {
            if (error) {
                return connection.rollback(function () {
                    res.status(500).send('Erro ao inserir a pessoa.');
                });
            }

            // Recupera o último ID inserido na tabela Pessoa
            const idPessoa = results.insertId;

            // Insere o funcionário na tabela Funcionário
            connection.query("INSERT INTO Funcionario (Funcao, Pessoa_idPessoa) VALUES (?,?);", [Funcao, idPessoa], function (error, results, fields) {
                if (error) {
                    return connection.rollback(function () {
                        res.status(500).send('Erro ao inserir o Funcionario.');
                    });
                }

                // Confirma a transação
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            res.status(500).send('Erro ao confirmar a transação.');
                        });
                    }
                    res.send('Transação concluída com sucesso!');
                });
            });
        });
    });
});

funcionario.delete('/funcionario/delete/:id', (req, res) => {
    const idFuncionario = req.params.id;

    connection.query(
        'DELETE FROM Funcionario WHERE idFuncionario = ?',
        [idFuncionario],
        (error, results) => {
            if (error) {
                return res.send(error);
            } else {
                return res.json({
                    data: results
                });
            }
        }
    );
})

module.exports = funcionario; 