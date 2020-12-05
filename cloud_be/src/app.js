const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

require('./routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

module.exports = app;