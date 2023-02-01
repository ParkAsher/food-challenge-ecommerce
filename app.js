const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');

const app = express();

/* socket */
const http = createServer(app);

/* router */
const router = require('./routes');
const ejsRouter = require('./routes/ejs.routes');
const errorHandler = require('./middleware/errorhandler');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(ejsRouter);
app.use(errorHandler);

/* views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

module.exports = http;
