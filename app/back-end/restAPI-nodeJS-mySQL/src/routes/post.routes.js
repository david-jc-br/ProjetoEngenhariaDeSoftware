const express = require('express');
const postRoutes = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para inserir a Aluguel 
postRoutes.post('/aluguel/add', jsonParser, (req, res) => {
    const { codLocacao, dataDeInicio, dataDeFim, Veiculo_idVeiculo, Cliente_idCliente, Funcionario_idFuncionario, Funcionario_Pessoa_idPessoa } = req.body;

    connection.query("INSERT INTO Locacao (codLocacao, dataDeInicio, dataDeFim, Veiculo_idVeiculo, Cliente_idCliente, Funcionario_idFuncionario, Funcionario_Pessoa_idPessoa) VALUES (?, ?, ?, ?, ?, ?, ?);", [codLocacao, dataDeInicio, dataDeFim, Veiculo_idVeiculo, Cliente_idCliente, Funcionario_idFuncionario, Funcionario_Pessoa_idPessoa], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    }
    );
})

// Rota para validar login
postRoutes.post('/login/validar', jsonParser, (req, res) => {
    const { Email, Senha } = req.body;

    connection.query("SELECT CASE WHEN COUNT(*) > 0 THEN 'true' ELSE 'false' END AS valido FROM Pessoa WHERE Email = ? AND Senha = ?;", [Email, Senha], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            });
        }
    }
    );
})

// Inicia a transação inserir cliente e pessoa
postRoutes.post('/cliente/add', jsonParser, (req, res) => {
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

// Inicia a transação
postRoutes.post('/funcionario/add', jsonParser, (req, res) => {
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

module.exports = postRoutes;