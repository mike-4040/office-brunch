const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = require('./connection');

const Users = {
  all: cb =>
    connection.query(
      'SELECT firstName, lastName, email FROM users',
      (err, res) => errHandler(err, res, cb, { code: 1, mgs: 'No user found' })
    ),
  auth: (email, password, cb) => {
    connection.query(
      'SELECT id, firstName, lastName, password FROM users WHERE email = ? LIMIT 1;',
      [email],
      (err, res) => {
        const user = res[0];
        if (err) cb({ code: 1, message: 'Server Error' });
        else if (!user) cb({ code: 2, message: 'User not found' });
        else if (bcrypt.compareSync(password, res[0].password)) {
          const token = jwt.sign(
            { id: user.id, email, fisrtName: user.firstName },
            // eslint-disable-next-line no-undef
            process.env.SERVER_SECRET,
            { expiresIn: 129600 }
          );
          cb({ code: 0, token });
        } else cb({ code: 4, message: 'Wrong pasword' });
      }
    );
  }
};

const errHandler = (err, res, cb, error) => {
  if (err) return cb({ error });
  cb(res);
};

module.exports = Users;
