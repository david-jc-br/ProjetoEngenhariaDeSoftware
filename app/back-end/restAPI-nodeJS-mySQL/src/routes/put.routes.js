const express = require('express');
const putRoutes = express.Router(); //Router() é uma classe no Express que permite criar objetos de roteador
const connection = require('../connection/mysql-connection');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json(); 

/*putRoutes.put('/people/update/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, email, age, gender, address } = req.body;

    connection.query(
        'UPDATE People SET first_name=?, last_name=?, email=?, age=?, gender=?, address=? WHERE id=?',
        [first_name, last_name, email, age, gender, address, id],
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
});*/

module.exports = putRoutes; 