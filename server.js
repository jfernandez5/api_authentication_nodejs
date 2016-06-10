/**
 * Created by javier on 17/05/2016.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/config');
var path = require('path');
var fs = require('fs');

/* morgan */
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'})
app.use(morgan('combined', {stream: accessLogStream}));

/* configuration */
var port = process.env.PORT || 9000;

/* mongodb */
mongoose.connect(config.database, function(error) {
    if(error) {
        console.log("Can not connect to DB " + error);
    } else {
        console.log("MongoDB connected at port " + config.portDBMongo);
    }
});

/* user body parser to get info from post */
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


/* routes */
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

var apiRoute = require('./routes/api_routes');
var userRoute = require('./routes/user_routes');

app.use('/api', apiRoute);
app.use('/user', userRoute);

app.listen(port);

console.log('Magic happens at http://localhost:' + port);