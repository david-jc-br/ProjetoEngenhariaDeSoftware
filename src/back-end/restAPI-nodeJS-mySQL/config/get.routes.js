const express = require('express');
const getRoutes = express.Router();
const connection = require('../connection/mysql-connection');

getRoutes.get('/', (req,res) => {
    res.status(200).send('Restful API NodeJS Working')
})

getRoutes.get('/clientes', (req, res) => {
    connection.query(
        'SELECT * FROM Cliente',
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

getRoutes.get('/cliente/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM pessoa WHERE idCliente = ?',
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

getRoutes.get('/pessoas', (req, res) => {
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

getRoutes.get('/alugueis', (req, res) => {
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

getRoutes.get('/aluguel/:id', (req, res) => {
    const id = req.params.id;

    connection.query(
        'SELECT * FROM pessoa WHERE cod = ?',
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


getRoutes.get('/funcionarios', (req, res) => {
    connection.query(
        'SELECT * FROM Funcionario',
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

getRoutes.get('/veiculos', (req, res) => {
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

module.exports =  getRoutes;