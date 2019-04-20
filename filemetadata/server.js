'use strict';

//Create a folder called uploads to catch the files
var express = require('express');
var cors = require('cors');
const uploadRoute = require('./src/file.route')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://CorneilleEdi:CorneilleEdi16@localhost/metadata?authSource=admin' )

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.use("",uploadRoute)

app.listen(process.env.PORT || 3000, function () {
  console.log('👋 🎧 ☄️ 🌟 Node.js listening ...');
});
