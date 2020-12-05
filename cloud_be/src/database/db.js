require('dotenv').config();

var neo4j = require('neo4j-driver');
var driver = neo4j.driver(
    process.env.DB_URI, 
    neo4j.auth.basic(
        process.env.DB_USER, 
        process.env.DB_PASSWORD
    )
);
var session = driver.session();

module.exports = session