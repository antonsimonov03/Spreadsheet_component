var express = require('express');
var _ = require('lodash');
var config = require('./config');
var jwt = require('jsonwebtoken');

var User = require('./model/user');
var Table = require('./model/table');

var app = module.exports = express.Router();

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { 
    expiresIn: 240 * 5 
  });
}

app.post('/create-session', (req, res) => {
  let { name, password } = req.body;
  let user = { name, password };

  User.find({ name, password }, (err, dbRes) => {
    if (err || !dbRes[0]) {
      return res.status(401).send({
        message: "The username or password don't match", 
        user
      });
    } else {
      res.status(201).send({
        id_token: createToken(user)
      })
    }
  })
});

app.get('/table', (req, res) => {
  Table.find({}).then(data => {
    data = _.sortBy(data, 'order');
    res.status(201).send(data);
  }).catch(error => {;
    res.status(500).send(data);
  })
})

app.post('/table/row', (req, res) => {
  Table.find({}, (err, cols) => {
    Promise.all(_.map(cols, col => {
      return new Promise((resolve, reject) => {
        Table.findByIdAndUpdate(col._id, { row: col.row.concat({ title: '' }) }, (err, res) => {
          if (err) reject(err)
          resolve(res);
        })
      })
    }))
    .then(result => {
      res.status(201).send("New row is added!")
    })
  })
})

app.delete('/table/row', (req, res) => {
  Table.find({}, (err, cols) => {
    Promise.all(_.map(cols, col => {
      return new Promise((resolve, reject) => {
        Table.findByIdAndUpdate(col._id, { row: col.row.slice(0, -1) }, (err, doc) => {
          if (err) reject(err)
          resolve(doc);
        })
      })
    }))
    .then(result => {
      console.log(result);
      res.status(201).send("Row is deleted!")
    })
  })
})

app.put('/table/column', (req, res) => {
  let { _id, title } = req.body;

  var query = { '_id': _id };

  Table.findOneAndUpdate(query, { 'title': title }, (err, doc) => {
    if (err) return res.send(500, { error: err });
    return res.status(201).send("Successfully saved!");
  });
})

app.post('/table/column', (req, res) => {
  Table.find({}, (err, cols) => {
    Table.create({
      'row': Array(cols[0].row.length).fill({ title: '' }),
      'title': ''
    })
    .then(answer => {
      if (answer) {
        res.status(201).send({ column: answer });
      }
    })
  })
})

app.delete('/table/column', (req, res) => {
  Table.deleteOne({ '_id': req.body._id }, (err, doc) => {
    if (err) {
      res.send(500, { error: err });
    } else {
      res.status(201).send("Successfully deleted!");
    }
  })
})

app.put('/table/cell', (req, res) => {
  let { _id, title } = req.body;

  var query = { 'row': { '_id': _id }};

  Table.update({
    "row._id": _id
  }, 
    {
      '$set': {
        'row.$.title': title
      }
    }
  , (err, doc) => {
    if (err) return res.send(500, { error: err });
    return res.status(201).send("Successfully saved!");
  });
})