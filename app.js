const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const router = express.Router();
app.use(router);

app.use(cookieParser());

require('./routes')(app);

app.use(function (req, res, next) {
    res.status(404).send('What are you looking for?!?');
});

app.listen(3000, function() {
    console.log('App started on 3000');
});