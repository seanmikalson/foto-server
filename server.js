var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();
var c = require('./config');

app.use(bodyParser.json({limit:'100000kb'}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.post('/', function (req, res) {
    console.log('posting picture');
    pg.connect(process.env.DATABASE_URL | c.config.dbConn, function(err, client, done){
        if(!err) {
            client.query('insert into pictures (data) values(\''+req.body.data+'\')', function(err, results) {
                console.log(err);
                done();
                res.send();
            });
        }
    });
    res.send();
});

app.get('/', function(req, res) {
    pg.connect(process.env.DATABASE_URL | c.config.dbConn, function(err, client, done){
        if(!err) {
            client.query('select * from pictures', function(err, results) {
                done();
                res.json(results.rows);
            });
        }
    });
});

var server = app.listen(process.env.PORT, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);

});
