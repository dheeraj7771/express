require('dotenv').config();
var PORT = process.env.PORT;
var express = require('express');
var app = express();

app.listen(PORT, function(){
    console.log("server is up and running n port:- "+ PORT);
});

app.get('/', function(request, response){
    response.send("Hello World by dheeraj");
});