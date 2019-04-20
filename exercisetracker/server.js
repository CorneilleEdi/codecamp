const express = require('express');
const app = express()
const shortid = require('shortid');
const bodyParser = require('body-parser');
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/exercise-track?' )


var User = require('./model/user.model')
const Exercise = require('./model/exercise.model');

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});




app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.post("/api/exercise/new-user",(req,res)=>{
  var username = req.body.username;
  var shortId = shortid.generate()
  if(!username|| username == "") res.redirect('/')
  let user = new User({
      username,
      shortId
  })

  user.save()
  .then(user => {
    let {username, shortId} = user

    res.json({username,shortId})

  }).catch(error=> {
    console.log(error);
  })

})

app.post("/api/exercise/add",(req,res)=>{
  var {userId,description,duration,date} = req.body
  if(!userId|| !description||!duration) res.redirect('/')

  if (date) {
    date = date;
  } else {
    date = new Date()
  }

  const exercise = new Exercise({
    userId,
    description,
    duration,
    date,
  });

  exercise.save((err, data) => {
    if (err) {
      res.send('Error ');
    } else {
      res.json(data);
    }
  });

})

app.get('/api/exercise/log', (req, res) => {
  var { userId, from, to, limit } = req.query;

  if (!userId) return res.status(400).send('userId required');

  User.findOne({ shortId : userId }, (err, user) => {
    if (err) return res.status(400).send('Invalid userId');
    if (!user) return res.status(400).send('User not found');
    Exercise.find({ userId: userId })
      .where('date')
      .gte(from ? new Date(from) : new Date(0))
      .where('date')
      .lte(to ? new Date(to) : new Date())
      .limit(limit ? Number(limit) : 10)
      .exec((err, results) => {
        if (err) return res.status(400).send(err.message);
        return res.json({
          data: results
        });
      });
  });
});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
