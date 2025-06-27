require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

const indexPath = __dirname + '/views/index.html';
const stylesPath = __dirname + '/public';


app.use('/public', express.static(stylesPath));
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', (req, res, next) => {
    console.log(req.method, ' ', req.path, ' - ', req.ip);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/json', (req, res) => {
    console.log();
    res.json({"message": process.env.MESSAGE_STYLE === 'uppercase'  ? "HELLO JSON" : "Hello json"});
});

app.get('/now', (req, res, next) => {
    req.time =  new Date().toISOString();
    next();
}, (req, res) => {
    console.log();
    res.json({time: req.time});
});

app.get('/:world/echo', (req, res) => {
    const { world } = req.params;
    res.json({echo: world});
});

app.get('/name', (req, res) => {
    const { first, last } = req.query;
    res.json({name: `${first} ${last}`});
});

app.post('/name', (req, res) => {
    const { first, last } = req.body;
    res.json({name: `${first} ${last}`});
});



































 module.exports = app;
