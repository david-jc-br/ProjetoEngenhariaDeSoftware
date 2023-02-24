const cors = require('cors');
const express = require('express'); // importa o módulo do framework 
const https = require('https');
const fs = require('fs');
const get_Routes = require('./routes/get.routes');
const post_Routes = require('./routes/post.routes');
const put_Routes = require('./routes/put.routes.js');
const delete_routes = require( './routes/delete.routes');

const app = express(); // cria uma instância do servidor web do Express.js para tratarmos de 
app.use(cors()); 
app.use(get_Routes, post_Routes, put_Routes, delete_routes);// ultiliza as rotas, midllewares entre outro criados

const options = {
    key: fs.readFileSync('./SSL/code.key'),
    cert: fs.readFileSync('./SSL/code.crt')
};

https.createServer(options, app)
    .listen(3001, () => {
        console.log('Express started at https://localhost:3001');
    });
