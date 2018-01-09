var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://dvalian:Dovmat23@ds255455.mlab.com:55455/dvalian-db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./routes'));
app.use(require('./protected-routes'));

app.listen(port, () => {
  console.log(`api running on port ${port}`);
})