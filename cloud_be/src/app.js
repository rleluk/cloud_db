var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set(bodyParser.json());
app.set(bodyParser.urlencoded({extended: false}));
require('./routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

module.exports = app;