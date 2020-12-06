const driver = require('../database/db');
const { Neo4jError } = require('neo4j-driver/lib/error.js');

const runQuery = async (query, params) => {
    const session = driver.session();
    try {
        return await session.run(query, params);
    } catch (err) {
        console.log(err);
        throw new Neo4jError('Neo4j was unable to run query.')
    } finally {
        await session.close();
    }
};

const parseResponse = (res) => {
    let result = [];
    if (res.records.length > 0) {
        res.records.forEach(record => {
            result.push(record._fields[0].properties);
        }); 
        return result;
    }
    return JSON.stringify(result);
};

const parseComplexResponse = (res) => {
    let result = [];
    if (res.records.length > 0) {
        res.records.forEach(record => {
            let objects = [];
            for(let i = 0; i < record.length; i++) {
                objects.push([record.keys[i], record._fields[i].properties]);
            }
            result.push(Object.fromEntries(objects));
        }); 
    }
    return JSON.stringify(result);
};

module.exports = {
    runQuery,
    parseResponse,
    parseComplexResponse
}