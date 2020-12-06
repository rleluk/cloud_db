const express = require('express');
const router = express.Router();
const { runQuery, parseResponse } = require('../utils/runQuery');

router.get('/', async (req, res) => {
    try {
        result = await runQuery('MATCH (g: Genre) RETURN g', {});
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
            JSON.stringify({ message: 'No genre name.' })
        )
    }

    try {
        result = await runQuery(
            'MERGE (g: Genre {name: $name})', 
            { name }
        );
        res.status(204).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

router.delete('/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).send(
            JSON.stringify({ message: 'No genre name.' })
        )
    }

    try {
        await runQuery(
            'MATCH (g:Game)-[:HAS_GENRE]->(ge:Genre {name: $name}) DETACH DELETE g',
            { name }
        );
        await runQuery(
            'MATCH (g: Genre {name: $name}) DETACH DELETE g', 
            { name }
        )
        res.status(201).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

module.exports = router;