//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const items = ['buy food', 'cook food', 'eat food'];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  const day = date.getDate();

  res.render('index', { listTitle: day, newListItems: items });
});

app.post('/', function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === 'work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', function (req, res) {
  res.render('index', { listTitle: 'work List', newListItems: workItems });
});

app.post('/work', function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect('/work');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.listen(3000, function () {
  console.log('sever is ruuning on port 3000');
});
