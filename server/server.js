const express = require('express');
const app = express();
const path = require('path');

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

app.listen(3000);
