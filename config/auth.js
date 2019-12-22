/* global process */
const db = require('../models1');
const jwt = require('jsonwebtoken');

module.exports = {
  logUserIn: function(email, password) {
    return new Promise((resolve, reject) => {
      db.User.findOne({ where: { email } })
        .then(user => {
          if (user.validPassword(password)) {
            const token = jwt.sign(
              { id: user.dataValues.id, email: user.dataValues.email },
              process.env.SERVER_SECRET,
              { expiresIn: 129600 }
            );
            resolve({
              success: true,
              message: 'Token Issued!',
              token: token,
              user: user.dataValues
            });
          } else reject({ success: false, message: 'Authentication failed. Wrong password.' });
        })
        .catch(err => reject({ success: false, message: 'User not found', error: err }));
    });
  }
};
