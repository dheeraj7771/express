require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const MONGO_URI = process.env.MONGO_URI;

app.get('/users', function(request, response){
    MongoClient.connect(MONGO_URI, function(err, db){
        if(err) {
            response.send(`Error fetching all users => ${err}`);
        }
        db.collection('users').find().toArray(function(err, docs) {
            response.send(docs);
        });
    });
});
