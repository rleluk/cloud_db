const express = require('express');
const router = express.Router();
const { runQuery, parseComplexResponse } = require('../utils/runQuery');
const uuid = require('uuid');
const { int } = require('neo4j-driver');

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
            { name, producer, platform, genre, fromYear: parseInt(fromYear), toYear: parseInt(toYear) }
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
        const gameID = uuid.v4();
        await runQuery(
            'CREATE (g:Game {id: $id, name: $name, productionYear: $productionYear})',
            { id: gameID, name, productionYear }
        );
        await runQuery(
            `MATCH (g:Game {id: $id, name: $name}), (ge:Genre {name: $genre})
             CREATE (g)-[:HAS_GENRE]->(ge)`, 
             { id: gameID, name, genre }
        )
        await runQuery(
            `MATCH (g:Game {id: $id, name: $name}), (p:Platform {name: $platform})
            CREATE (g)-[:ON_PLATFORM]->(p)`, 
             { id: gameID, name, platform }
        )
        await runQuery(
            `MATCH (g:Game {id: $id, name: $name}), (p:Producer {name: $producer})
            CREATE (g)-[:PRODUCED_BY]->(p)`, 
             { id: gameID, name, producer }
        )
        res.status(201).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send(
            JSON.stringify({ message: 'No game ID.' })
        )
    }

    try {
        await runQuery(
            'MATCH (g:Game {id: $id}) DETACH DELETE g',
            { id }
        );
        res.status(204).send();
    } catch(err) {
        console.log(err)
        res.status(500).send();
    }
});

module.exports = router;