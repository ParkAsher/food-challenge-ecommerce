const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const passportConfig = require('./passport');
const session = require('express-session');

const app = express();

passportConfig(app);

/* socket */
const http = createServer(app);

/* router */
const router = require('./routes');
const kakaoRouter = require('./routes/auth.routes'); // KAKAO LOGIN Router
const ejsRouter = require('./routes/ejs.routes');
const errorHandler = require('./middleware/errorhandler');

app.use(cookieParser());
app.use(express.json());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/auth', kakaoRouter);
app.use(ejsRouter);
app.use(errorHandler);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

module.exports = http;
