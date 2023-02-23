const express = require('express');
const postRoutes = express.Router();
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json(); 

// Rota para inserir a Aluguel 
postRoutes.post('/aluguel/add', jsonParser, (req, res) => 
{
    const {codLocacao, dataDeInicio, dataDeFim, Veiculo_idVeiculo, Cliente_idCliente, Funcionario_idFuncionario, Funcionario_Pessoa_idPessoa} = req.body;

    connection.query("INSERT INTO Locacao (codLocacao, dataDeInicio, dataDeFim, Veiculo_idVeiculo, Cliente_idCliente, Funcionario_idFuncionario, Funcionario_Pessoa_idPessoa) VALUES (?, ?, ?, ?, ?, ?, ?);", [codLocacao, dataDeInicio, dataDeFim, Veiculo_idVeiculo, Cliente_idCliente, Funcionario_idFuncionario, Funcionario_Pessoa_idPessoa],(err, results) => {
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

// Rota para inserir a pessoa 
postRoutes.post('/pessoa/add', jsonParser, (req, res) => 
{
    const {NomeCompleto, CPF, Endereco, Telefone, Email, Sexo,DataNascimento} = req.body;

    connection.query("insert into `Pessoa` (NomeCompleto, CPF, Endereco, Telefone, Email, Sexo, DataNascimento ) values(?, ?, ?, ?, ?, ?, ?)", [NomeCompleto,CPF,Endereco,Telefone,Email,Sexo,DataNascimento],(err, results) => {
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