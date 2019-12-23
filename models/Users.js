/* global process */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = require('./connection');

const Users = {
  all: cb =>
    connection.query(
      'SELECT firstName, lastName, email FROM users',
      (err, res) => {
        let reply = {};
        if (err) reply = { code: 1, payload: 'Database error' };
        else if (res.length === 0)
          reply = { code: 2, payload: 'No user found' };
        else reply = { code: 0, payload: res };
        cb(reply);
      }
    ),
  auth: (email, password, cb) => {
    const query =
      'SELECT id, firstName, lastName, password FROM Users WHERE email = ? LIMIT 1';
    connection.query(query, [email], (err, res) => {
      let reply = {};
      if (err) {
        reply = { code: 1, message: 'Database error' };
        return cb(reply);
      }
      const user = res[0];
      if (!user) reply = { code: 2, message: 'User not found' };
      else if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, email, fisrtName: user.firstName },
          process.env.SERVER_SECRET,
          { expiresIn: 129600 }
        );
        reply = { code: 0, token };
      } else reply = { code: 4, message: 'Wrong pasword' };
      cb(reply);
    });
  },
  create: (inUser, cb) => {
    const user = { ...inUser };
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
    const query =
      'INSERT INTO Users ( ??, ??, ??, ??, ??) VALUES( ?, ?, ?, ?, ?)';
    connection.query(
      query,
      [...Object.keys(user), ...Object.values(user)],
      (err, res) => {
        console.log('ERR', err, 'RES', res);
        if (err) return cb({ code: 1, message: err.sqlMessage });
        cb({ code: 0, message: res.insertId });
      }
    );
  }
};

module.exports = Users;
