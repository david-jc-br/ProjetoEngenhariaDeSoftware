const express = require('express');
const cliente = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para obter todos clientes-pessoas
cliente.get('/cliente', (req, res) => {
    connection.query(
        'SELECT DISTINCT idPessoa, idCliente, NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, CNH FROM Pessoa INNER JOIN Cliente ON Pessoa.idPessoa = Cliente.Pessoa_idPessoa;',
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

// Rota para obter um cliente específico 
cliente.get('/cliente/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM Cliente WHERE idCliente = ?',
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


// Inicia a transação inserir cliente e pessoa
cliente.post('/cliente/add', jsonParser, (req, res) => {
    const {
        NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, CNH } = req.body

    // Inicia a transação
    connection.beginTransaction(function (err) {
        if (err) {
            res.status(500).send('Erro ao iniciar a transação.');
            return;
        }

        // Insere a pessoa na tabela Pessoa
        connection.query("INSERT INTO Pessoa (NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, TipoUsuario) VALUES (?,?,?,?,?,?,?,?,'Cliente');", [NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha], function (error, results, fields) {
            if (error) {
                return connection.rollback(function () {
                    res.status(500).send('Erro ao cadastrar a pessoa.');
                });
            }

            // Recupera o último ID inserido na tabela Pessoa
            const idPessoa = results.insertId;

            // Insere o cliente na tabela Cliente
            connection.query("INSERT INTO Cliente (CNH, Pessoa_idPessoa) VALUES (?,?);", [CNH, idPessoa], function (error, results, fields) {
                if (error) {
                    return connection.rollback(function () {
                        res.status(500).send('Erro ao cadastrar o cliente.');
                    });
                }

                // Confirma a transação
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            res.status(500).send('Erro ao confirmar a transação.');
                        });
                    }
                    res.send('Cliente Cadastrado com sucesso!');
                });
            });
        });
    });
});

cliente.delete('/cliente/delete/:id', (req, res) => {
    const idCliente = req.params.id;

    connection.query(
        'DELETE FROM Cliente WHERE idCliente = ?',
        [idCliente],
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


module.exports = cliente; 