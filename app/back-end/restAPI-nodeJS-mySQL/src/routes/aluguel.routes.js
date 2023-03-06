const express = require('express');
const aluguel = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

aluguel.get('/', (req, res) => {
    res.status(200).send('Restful API NodeJS Working')
})

// Rota para obter todos os alugueis
aluguel.get('/aluguel', (req, res) => {
    connection.query(
        'SELECT * FROM Aluguel',
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
aluguel.get('/aluguel/:id', (req, res) => {
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

// Rota para inserir a Aluguel 
aluguel.post('/aluguel/add', jsonParser, (req, res) => {
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

// Update Cliente Pessoa
aluguel.put('/cliente/update/:id', jsonParser, (req, res) => {
    const idPessoa = req.params.id;
    const { NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, CNH } = req.body;

    // Inicia a transação
    connection.beginTransaction(function (err) {
        if (err) {
            res.status(500).send('Erro ao iniciar a transação.');
            return;
        }

        // Insere a pessoa na tabela Pessoa
        connection.query('UPDATE Pessoa SET NomeCompleto=?, CPF=?, Endereco=?, Telefone=?, Email=?, Sexo=?, DataNascimento=?, Senha=? WHERE idPessoa=?', [NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, idPessoa], function (error, results, fields) {
            if (error) {
                return connection.rollback(function () {
                    res.status(500).send('Erro ao atualizar pessoa.');
                });
            }

            // Recupera o último ID inserido na tabela Pessoa
            const idPessoa = results.insertId;

            // Insere o funcionário na tabela Funcionário
            connection.query("UPDATE Cliente SET CNH=? WHERE Pessoa_idPessoa=?;", [CNH, idPessoa], function (error, results, fields) {
                if (error) {
                    return connection.rollback(function () {
                        res.status(500).send('Erro ao atualizar o Cliente.');
                    });
                }

                // Confirma a transação
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            res.status(500).send('Erro ao confirmar a transação.');
                        });
                    }
                    res.send('Cliente Atualizado com sucesso!');
                });
            });
        });
    });
});

aluguel.delete('/aluguel/delete/:id', (req, res) => {
    const codLocacao = req.params.id;

    connection.query(
        'DELETE FROM Aluguel WHERE codLocacao = ?',
        [codLocacao],
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


module.exports = aluguel; 