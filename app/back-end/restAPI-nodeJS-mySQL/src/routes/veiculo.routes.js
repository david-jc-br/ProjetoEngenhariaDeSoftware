const express = require('express');
const veiculo = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para obter todos os veiculos 
veiculo.get('/veiculo', (req, res) => {
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
veiculo.get('/veiculo/:id', (req, res) => {
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

veiculo.delete('/veiculo/delete/:id', (req, res) => {
    const idVeiculo = req.params.id;

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


module.exports = veiculo; 