
var express = require('express');
var jwt = require('express-jwt');
var config = require('./config');

var app = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/home', jwtCheck);

app.get('/home/protected', (req, res) => {
  res.status(200).send({ message: 'You are logged in!' });
});

module.exports = app;