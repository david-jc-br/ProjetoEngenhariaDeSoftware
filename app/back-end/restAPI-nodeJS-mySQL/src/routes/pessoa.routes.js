const express = require('express');
const pessoa = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para obter todas as pessoas
pessoa.get('/pessoa', (req, res) => {
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
pessoa.get('/pessoa/:id', (req, res) => {
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

pessoa.delete('/pessoa/delete/:id', (req, res) => {
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

module.exports = pessoa;




