const express = require('express');
const exphbs  = require('express-handlebars');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require("express-session");

const settings = require('./settings.json');

const app = express();

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: settings['cookie-secret'],
    name: "session",
    cookie: { maxAge: 1000 * 60 * 10 }
}));

app.use('/static', express.static('static'));

app.use(helmet());
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('home', {title: "Home"});
});

app.use('/verify', require('./routers/verify.js'));
app.use('/discord', require('./routers/discord.js'));

app.listen(8080);