// Initialization
const express = require('express');
const app = express();
require('dotenv').config()

// Middleware 
app.use(express.json());
app.use(express.urlencoded());
const cors = require('cors'); 
app.use(cors());

// Mongoose setup
const mongoose = require('mongoose');
const Weight = require('./models/weights');

app.listen(3000, () => {
  console.log('Connected to localhost 3000');
});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
});


// API ROUTES
// GET all weight records
app.get('/get-weight/:user', (req, res) => {
  Weight.find({user: req.params.user}, (err) => {
    if (err) throw err;
    console.log('Query complete');
  })
  .then((result) => {
    res.send(result);
  });
})

// POST new weight record
app.post('/new-weight', (req, res) => {
  const weight = new Weight({
    weight: req.body.weight,
    user: req.body.user
  });
  weight.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      throw err;
    })
});

// DELETE weight record
app.delete('/delete-weight/:id', (req, res) => {
  console.log(req.params.id);
  Weight.remove({ _id: req.params.id })
    .then((result) => console.log('Record deleted'))
    .catch((err) => {
      throw err;
    });
});