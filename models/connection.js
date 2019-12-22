const mysql = require('mysql');

// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line no-undef
let config = require(__dirname + '/../config/config.json')[env];

config = config.use_env_variable || config;

console.log('Config:', config);

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) return console.error('error connecting: ' + err.stack);
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
