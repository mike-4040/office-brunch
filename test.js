require('dotenv').config();
const Users = require('./models/Users');

Users.all(data => {
  console.log(JSON.stringify(data));
});

// Users.auth('1@1.com', '1', console.log);

