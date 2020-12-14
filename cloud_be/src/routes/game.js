const express = require('express');
const router = express.Router();
const { runQuery, parseComplexResponse } = require('../utils/runQuery');

router.get('/', async (req, res) => {
    let { name, genre, producer, platform, toYear, fromYear } = req.query;
    try {
        let queryYear = '';
        if (toYear) {
            queryYear += `AND game.productionYear <= $toYear\n`;
        } 
        if (fromYear) {
            queryYear += `AND game.productionYear >= $fromYear`;
        }
        
        const result = await runQuery(
            `MATCH (game:Game)-[:HAS_GENRE]->(genre:Genre), 
                (game:Game)-[:PRODUCED_BY]->(producer:Producer), 
                (game:Game)-[:ON_PLATFORM]->(platform:Platform)
            WHERE game.name CONTAINS $name
                AND producer.name CONTAINS $producer
                AND platform.name CONTAINS $platform
                AND genre.name CONTAINS $genre
                ${queryYear}
            RETURN game, genre, producer, platform`,
            { name, producer, platform, genre, fromYear: fromYear, toYear: toYear }
        );
        res.status(200).send(parseComplexResponse(result));
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    const { name, genre, producer, platform, productionYear } = req.body;
    if (!name && !genre && !producer && !platform) {
        return res.status(400).send(
            JSON.stringify({ message: 'Unable to create game record without enough data.' })
        )
    }

    try {
        await runQuery(
            'MERGE (g:Game {name: $name, productionYear: $productionYear})',
            { name, productionYear }
        );
        await runQuery(
            `MATCH (g:Game {name: $name}), (ge:Genre {name: $genre})
             MERGE (g)-[:HAS_GENRE]->(ge)`, 
             { name, genre }
        )
        await runQuery(
            `MATCH (g:Game {name: $name}), (p:Platform {name: $platform})
            MERGE (g)-[:ON_PLATFORM]->(p)`, 
             { name, platform }
        )
        await runQuery(
            `MATCH (g:Game {name: $name}), (p:Producer {name: $producer})
            MERGE (g)-[:PRODUCED_BY]->(p)`, 
             { name, producer }
        )
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
            JSON.stringify({ message: 'No game name.' })
        )
    }

    try {
        await runQuery(
            'MATCH (g:Game {name: $name}) DETACH DELETE g',
            { name }
        );
        res.status(204).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

module.exports = router;