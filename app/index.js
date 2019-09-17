var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var fs = require("fs");
var port = process.env.PORT || 3000;

app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));

MongoClient.connect('mongodb://localhost:27017/hw2', function(err, client){
  if(err){
      console.log(err);
  }else{
      console.log("success connet to db");
  }
  db = client.db('hw2');
  collection = db.collection("factbook")
  
})
