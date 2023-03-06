
const express = require('express');
const login = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Rota para validar login
login.post('/login/validar', jsonParser, (req, res) => {
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

module.exports = login;