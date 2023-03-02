const express = require('express');
const putRoutes = express.Router(); //Router() é uma classe no Express que permite criar objetos de roteador
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Update Cliente Pessoa
putRoutes.put('/cliente/update/:id', jsonParser, (req, res) => {
    const idPessoa = req.params.id;
    const { NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento, Senha, CNH } = req.body;

    // Inicia a transação
    connection.beginTransaction(function (err) {
        if (err) {
            res.status(500).send('Erro ao iniciar a transação.');
            return;
        }

        // Insere a pessoa na tabela Pessoa
        connection.query('UPDATE Pessoa SET NomeCompleto=?, CPF=?, Endereco=?, Telefone=?, Email=?, Sexo=?, DataNascimento=?, Senha=? WHERE idPessoa=?', [NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento,Senha,idPessoa], function (error, results, fields) {
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
                    res.send('Transação concluída com sucesso!');
                });
            });
        });
    });
});

module.exports = putRoutes; 