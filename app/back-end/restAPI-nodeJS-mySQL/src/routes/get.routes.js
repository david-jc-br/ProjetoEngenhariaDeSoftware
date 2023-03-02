const express = require('express');
const getRoutes = express.Router();
const connection = require('../connection/mysql-connection');

getRoutes.get('/', (req,res) => {
    res.status(200).send('Restful API NodeJS Working')
})

// Rota para obter todos os alugueis
getRoutes.get('/aluguel', (req, res) => {
    connection.query(
        'SELECT * FROM Aluguel Inner Join',
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

// Rota para obter um aluguel específico
getRoutes.get('/aluguel/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM Aluguel WHERE codLocacao = ?',
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

// Rota para obter todos clientes-pessoas
getRoutes.get('/cliente', (req, res) => {
    connection.query(
        'SELECT DISTINCT idCliente, NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, CNH FROM Pessoa INNER JOIN Cliente ON Pessoa.idPessoa = Cliente.Pessoa_idPessoa;',
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
getRoutes.get('/cliente/:id', (req, res) => {
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

// Rota para obter todos os funcionários com seus respectivos dados
getRoutes.get('/funcionario', (req, res) => {
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
getRoutes.get('/funcionario/:id', (req, res) => {
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

// Rota para obter todas as pessoas
getRoutes.get('/pessoa', (req, res) => {
    connection.query(
        'SELECT * FROM Pessoa',
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

// Rota para obter uma pessoa específica
getRoutes.get('/pessoa/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM Pessoa WHERE idPessoa = ?',
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

// Rota para obter todos os veiculos 
getRoutes.get('/veiculo', (req, res) => {
    connection.query(
        'SELECT * FROM Veiculo',
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

// Rota para obter um veiculo especifico
getRoutes.get('/veiculo/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM Veiculo WHERE idVeiculo = ?',
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

module.exports =  getRoutes;