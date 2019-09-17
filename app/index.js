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

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
      console.log(err);
  }else{
      console.log("success connet to db");
  }
  db = client.db('hw2');
  collection = db.collection("factbook")
  var file_dir = './factbook';
  fs.readdir(file_dir, function(err, folders) {
    if (err) {
      console.log("Error finding directory");
    } else {
      folders.forEach(function(folder) {
        var sub_dir = file_dir + '/' + folder;
        fs.readdir(file_dir + '/' + folder, function(err, files) {
          if (err) {
            console.log("Error finding sub directory " + sub_dir);
          } else {
            files.forEach(function(file) {
              var json_dir = sub_dir + '/' + file;
              var json_file = JSON.parse(fs.readFileSync(json_dir).toString());
              collection.insert(json_file, {checkKeys: false})
            })
          }
        })
      })
    }
  })
})
