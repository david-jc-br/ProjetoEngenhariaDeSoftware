const express = require('express');
const putRoutes = express.Router(); //Router() é uma classe no Express que permite criar objetos de roteador
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json(); 

putRoutes.put('/cliente/put/:id', jsonParser, (req, res) => {
    const idPessoa = req.params.id;
    const {NomeCompleto, CPF, Endereco, Telefone, Email, Sexo,DataNascimento} = req.body;

    connection.query(
        'UPDATE Pessoa SET NomeCompleto=?, CPF=?, Endereco=?, Telefone=?, Email=?, Sexo=?, DataNascimento=? WHERE idPessoa=?', [NomeCompleto, CPF, Endereco, Telefone, Email, Sexo,DataNascimento, idPessoa],
        (err, results) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json({
                    data: results,
                });
            }
        }
    );
});

module.exports = putRoutes; 