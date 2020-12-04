var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');

var app = express();

app.set(bodyParser.json());
app.set(bodyParser.urlencoded({extended: false}));

var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '123456'));
var session = driver.session();

app.get('/', (req, res) => {
    session
        .run('MATCH(n:Movie) RETURN n LIMIT 25')
        .then(res => {
            console.log(res)
            // result.records.forEach((record) =>{
            //     console.log(record);
            // });
        })
        .catch(err => console.log(err));
    res.send('It works!');
});

app.listen(3000);
console.log('Server started on port 3000.');

module.exports = app;