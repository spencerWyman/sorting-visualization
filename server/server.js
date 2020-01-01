const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController')

const app = express();

const mongoURI = 'mongodb://localhost:27017/sortingAlgorithmsDev'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true});

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    console.log('LOADING PAGE');
    res.sendFile(path.resolve(__dirname,  '../index.html'));
  });

  app.get('/styles.css', (req, res) => {
    console.log('SENDING STYLES');
    res.sendFile(path.resolve(__dirname, '../styles.css'))
  });

  app.get('/build/bundle.js', (req, res) => {
    console.log('SENDING JS FILE');
    res.set({
      'Content-Type': 'application/x-javascript'
    })
    res.sendFile(path.resolve(__dirname, '../build/bundle.js'));
    console.log('FILE SENT');
  })
}

app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../app.html'))
})

app.use((req, res) => {
  res.status(404).send('Uhh, what were you looking for?')
})

app.use((err, req, res, next) => {
  console.log('Uncaught middleware error', err);
  res.status(400).send(err);
})

app.listen(3000);
