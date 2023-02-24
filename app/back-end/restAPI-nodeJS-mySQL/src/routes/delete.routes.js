const express = require('express');
const deleteRoutes = express.Router();
const connection = require('../connection/mysql-connection');

deleteRoutes.delete('/aluguel/delete/:id', (req, res) => {
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

deleteRoutes.delete('/pessoa/delete/:id', (req, res) => {
    const idPessoa = req.params.id;

    connection.query(
        'DELETE FROM Pessoa WHERE idPessoa = ?',
        [idPessoa],
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

deleteRoutes.delete('/cliente/delete/:id', (req, res) => {
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

deleteRoutes.delete('/funcionariodelete/:id', (req, res) => {
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

deleteRoutes.delete('/login/delete/:id', (req, res) => {
    const Email = req.params.id;

    connection.query(
        'DELETE FROM Login WHERE Email = ?',
        [Email],
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

deleteRoutes.delete('/veiculo/delete/:id', (req, res) => {
    const Email = req.params.id;

    connection.query(
        'DELETE FROM Veiculo WHERE idVeiculo = ?',
        [idVeiculo],
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

module.exports =  deleteRoutes;