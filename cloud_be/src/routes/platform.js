const express = require('express');
const router = express.Router();
const { runQuery, parseResponse } = require('../utils/runQuery');

router.get('/', async (req, res) => {
    try {
        result = await runQuery('MATCH (p: Platform) RETURN p', {});
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
            JSON.stringify({ message: 'No platform name.' })
        )
    }

    try {
        result = await runQuery(
            'MERGE (p: Platform {name: $name})', 
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
            JSON.stringify({ message: 'No platform name.' })
        )
    }

    try {
        await runQuery(
            'MATCH (g:Game)-[:ON_PLATFORM]->(p: Platform {name: $name}) DETACH DELETE g',
            { name }
        );
        await runQuery(
            'MATCH (p: Platform {name: $name}) DETACH DELETE p', 
            { name }
        )
        res.status(204).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

module.exports = router;