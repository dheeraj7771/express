require('dotenv').config();
var PORT = process.env.PORT;
var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, function(){
    console.log("server is up and running n port:- "+ PORT);
});

app.get('/', function(request, response){
    response.send("Hello World by dheeraj");
});

app.get('/users', function(request, response){
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