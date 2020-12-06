const express = require('express');
const router = express.Router();
const { runQuery, parseResponse } = require('../utils/runQuery');

router.get('/', async (req, res) => {
    try {
        result = await runQuery('MATCH (p: Producer) RETURN p', {});
        res.status(200).send(parseResponse(result));
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send(
            JSON.stringify({ message: 'No prodcuer name.' })
        )
    }

    try {
        result = await runQuery(
            'MERGE (p: Producer {name: $name})', 
            { name }
        );
        res.status(201).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

router.delete('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).send(
            JSON.stringify({ message: 'No producer name.' })
        )
    }

    try {
        await runQuery(
            'MATCH (g:Game)-[:PRODUCED_BY]->(p: Producer {name: $name}) DETACH DELETE g',
            { name }
        );
        await runQuery(
            'MATCH (p: Producer {name: $name}) DETACH DELETE p', 
            { name }
        )
        res.status(204).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

module.exports = router;