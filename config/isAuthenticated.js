/* global process */
const exjwt = require('express-jwt');

const isAuthenticated = exjwt({
  secret: process.env.SERVER_SECRET
});

module.exports = isAuthenticated;
