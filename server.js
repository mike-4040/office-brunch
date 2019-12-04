require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const db = require('./models');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

const isAuthenticated = require('./config/isAuthenticated');
const auth = require('./config/auth');

// Setting CORS so that any website can
// Access our API
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

// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => {
      const message = err.parent.errno === 1062 ? 'Duplicate entry' : 'Server error';
      res.status(404).send({ success: false, message });
    });
});

// unprotected list of companies
app.get('/api/company', (req, res) => {
  db.Company.findAll()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

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

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/', isAuthenticated, (req, res) => 
  res.send('You are authenticated')
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    res.status(401).send(err);
  else
    next(err);
});

app.get('*', (req, res) => 
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, './client/build/index.html'))
);

db.sequelize
  .sync({force: false})
  .then(() => app.listen(PORT, () => console.log('App listening on PORT ' + PORT)))
  .catch(err => console.log(err));
