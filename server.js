/* global process __dirname */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const db = require('./models1');
const Users = require('./models/Users');
const Company = require('./models/Company');

const PORT = process.env.PORT || 3001;

const isAuthenticated = require('./config/isAuthenticated');
// const auth = require('./config/auth');

// Setting CORS so that any website can access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', ({ body }, res) =>
  Users.auth(body.email, body.password, result => res.json(result))
);

app.post('/api/signup', ({ body }, res) =>
  Users.create(body, result => res.json(result))
);

// unprotected list of companies
app.get('/api/company', (req, res) => Company.all(result => res.json(result)));

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findByPk(req.params.id)
    .then(data => {
      if (data) res.json(data);
      else res.status(404).send({ success: false, message: 'No user found' });
    })
    .catch(err => res.status(400).send(err));
});

app.get('/api/user', isAuthenticated, (req, res) => {
  console.log('\nRequest at /api/user\n');
  db.User.findAll()
    .then(data => {
      if (data) res.json(data);
      else res.status(404).send({ success: false, message: 'No user found' });
    })
    .catch(err => res.status(400).send(err));
});

app.get('/api/users', (req, res) => {
  Users.all(data => {
    console.log(JSON.stringify(data));
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

db.sequelize
  .sync({ force: false })
  .then(() =>
    app.listen(PORT, () => console.log('App listening on PORT ' + PORT))
  )
  .catch(err => console.log(err));
