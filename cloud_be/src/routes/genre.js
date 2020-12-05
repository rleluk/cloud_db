const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
    res.status(501).send();
});

router.post('/', (req, res) => {
    res.status(501).send();
});

module.exports = router;