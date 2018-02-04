require('dotenv').config();
var PORT = process.env.PORT;
var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URI = process.env.MONGO_URI;
const bodyParser  = require('body-parser');

app.listen(PORT, function(){
    console.log("server is up and running n port:- "+ PORT);
});

app.get('/', function(request, response){
    response.send("Hello World by dheeraj");
});

app.use(bodyParser.json());

app.get('/usersdb', function(request, response){
    MongoClient.connect(MONGO_URI, function(err, db){
        if(err) {
            response.send(`Error fetching all users => ${err}`);
        }
        db.collection('users').find().toArray(function(errdb, docs) {
            if(errdb){
                response.send(`Error fetching all users => ${errdb}`);
            }
            response.send(docs);
        });
    });
});

app.get('/users/:id', function(req, res){
    var user = req.param.id-1;
    MongoClient.connect(MONGO_URI, function(err, db){
        if(err) {
            res.send(`Error fetching all users => ${err}`);
        }
        db.collection('users').findOne({"_id":user}, function(errdb, docs) {
            if(errdb){
                res.send(`Error fetching all users => ${errdb}`);
            }
            res.send(docs);
        });
    });
});


app.post('/users', function(req, res){
    MongoClient.connect(MONGO_URI, function(err, db){
        if(err) {
            res.send(`Error fetching all users => ${err}`);
        }
        db.collection('users').insertOne(req.body, function(errdb, result) {
            if(errdb){
                res.send(`Error fetching all users => ${errdb}`);
            }
            res.send(result);
        });
    });
});

app.delete('/users/:id', function(req, res){
    MongoClient.connect(MONGO_URI, function(err, db){
        if(err) {
            res.send(`Error fetching all users => ${err}`);
        }
        db.collection('users').remove({"_id":req.param.id-1}, function(errdb, result) {
            if(errdb){
                res.send(`Error fetching all users => ${errdb}`);
            }
            res.send(result);
        });
    });
});