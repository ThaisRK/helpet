const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//referencia o authController
require('./controllers/authController')(app);

//rota teste
app.get('/', (req, res) => {
    res.send('Ok');
});

app.listen(3000);
