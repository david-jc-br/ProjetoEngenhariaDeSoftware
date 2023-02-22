const mysql = require('mysql2');
// Conexão com o mysql
const connection = mysql.createConnection({
    host: 'solahic.com.br',
    user: 'elias',
    password: 'elias',
    database: 'teamdevop'
});

module.exports = connection;