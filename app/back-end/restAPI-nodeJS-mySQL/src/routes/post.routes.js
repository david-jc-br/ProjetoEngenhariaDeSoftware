const express = require('express');
const postRoutes = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json(); 

postRoutes.post('/pessoa/add', jsonParser, (req, res) => 
{
    const {NomeCompleto, Cpf, Endereco, Telefone, Email, Sexo,DataNascimento} = req.body;

    connection.query("insert into `Pessoa` (NomeCompleto, Cpf, Endereco, Telefone, Email, Sexo, DataNascimento) values(?, ?, ?, ?, ?, ?, ?)", [NomeCompleto,Cpf,Endereco,Telefone,Email,Sexo,DataNascimento],(err, results) => {
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

module.exports =  postRoutes;