/* global process __dirname */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const User = require('./models/User');
const Company = require('./models/Company');

const PORT = process.env.PORT || 3001;

const isAuthenticated = require('./utils/isAuthenticated');
// const auth = require('./config/auth');

// Setting CORS so that any website can access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', ({ body }, res) =>
  User.auth(body.email, body.password, result => res.json(result))
);

app.post('/api/signup', ({ body }, res) =>
  User.create(body, result => res.json(result))
);

// unprotected list of companies
app.get('/api/company', (req, res) => Company.all(result => res.json(result)));

app.get('/api/user/:id', isAuthenticated, (req, res) => {
  User.findById(req.params.id, result => res.json(result));
});

app.get('/api/user', isAuthenticated, (req, res) => {
  User.all(data => {
    if (data) res.json(data);
    else res.status(404).send({ success: false, message: 'No user found' });
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', isAuthenticated, (req, res) => res.send('You are authenticated'));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') res.status(401).send(err);
  else next(err);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './client/build/index.html'))
);

app.listen(PORT, () => console.log('App listening on PORT ' + PORT));

