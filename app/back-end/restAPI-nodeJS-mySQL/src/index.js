const cors = require('cors');
const express = require('express'); // importa o módulo do framework 
const https = require('https');
const fs = require('fs');
const cliente = require('./routes/cliente.routes');
const aluguel = require('./routes//aluguel.routes');
const funcionario = require('./routes/funcionario.routes');
const login = require( './routes/login.routes');
const pessoa = require( './routes/pessoa.routes');
const veiculo = require( './routes/veiculo.routes');

const app = express(); // cria uma instância do servidor web do Express.js para tratarmos de 
app.use(cors()); 
app.use(cliente, aluguel, funcionario, login, pessoa, veiculo);// ultiliza as rotas, midllewares entre outro criados

const options = {
    key: fs.readFileSync('./SSL/code.key'),
    cert: fs.readFileSync('./SSL/code.crt')
};

https.createServer(options, app)
    .listen(3001, () => {
        console.log('Express started at https://localhost:3001');
    });

    console.log(process.versions.v8);
