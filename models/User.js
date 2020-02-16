/* global process Buffer */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = require('./connection');
const { userMap } = require('./maps');
const { toJS, toSQL } = require('./jsToSqlMaps');

/** @aat  */
const {
  decryptPublicToken,
  mayBeParse,
  issueToken,
  decryptToken
} = require('../utils/_helpers');
const moment = require('moment');
const expDays = 7; // 1 one day expired expiration

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
};
/** end @aat */

const User = {
  all: cb =>
    connection.query(
      'SELECT first_name, last_name, email FROM user',
      (err, res) => {
        let reply = {};
        if (err) reply = { code: 1, payload: 'Database error' };
        else if (res.length === 0)
          reply = { code: 2, payload: 'No user found' };
        else reply = { code: 0, payload: res.map(user => toJS(user, userMap)) };
        cb(reply);
      }
    ),
  auth: (email, password, cb) => {
    const query =
      'SELECT user_id, first_name, last_name, password FROM user WHERE email = ? LIMIT 1';
    connection.query(query, [email], (err, res) => {
      if (err) return cb({ code: 1, message: 'Database error' });

      if (!res[0]) return cb({ code: 2, message: 'User not found' });

      const user = toJS(res[0], userMap);
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, email, fisrtName: user.firstName },
          process.env.SERVER_SECRET,
          { expiresIn: 129600 }
        );
        cb({ code: 0, token });
      } else cb({ code: 4, message: 'Wrong pasword' });
    });
  },
  create: (inUser, cb) => {
    const dbUser = toSQL(inUser, userMap);
    dbUser.password = bcrypt.hashSync(
      dbUser.password,
      bcrypt.genSaltSync(10),
      null
    );
    const query =
      'INSERT INTO user ( ??, ??, ??, ??, ??) VALUES( ?, ?, ?, ?, ?)';
    connection.query(
      query,
      [...Object.keys(dbUser), ...Object.values(dbUser)],
      (err, res) => {
        console.log('ERR', err, 'RES', res);
        if (err) return cb({ code: 1, message: err.sqlMessage });
        cb({ code: 0, message: res.insertId });
      }
    );
  },
  findById: (id, cb) => {
    const query =
      'SELECT first_name, last_name, email, org_id FROM user WHERE user_id = ?';
    connection.query(query, [id], (err, res) => {
      let reply = {};
      if (err) reply = { code: 1, message: 'Database error' };
      else if (res.length === 0) reply = { code: 2, message: 'No user found' };
      else reply = { code: 0, payload: toJS(res, userMap) };
      cb(reply);
    });
  },
  /** @aat */
  preSign: ({ info }, cb) => {
    const tokenInfo = mayBeParse(
      decryptPublicToken(Buffer.from(info, 'base64').toString())
    );
    //
    console.log('info     ->', info);
    console.log('decrypt  ->', tokenInfo);
    //
    if (
      // !tokenInfo.hasOwnProperty('digitalSign') ||
      !Object.prototype.hasOwnProperty.call(tokenInfo, 'digitalSign' ) ||
      tokenInfo.digitalSign != 'I approved that login'
    ) {
      cb({
        code: 1,
        status: 'error',
        message: 'Wrong Login'
      });
    }
    //
    const playload = {
      exp: moment()
        .add(expDays, 'days')
        .unix(), /// days ?
      iat: moment().unix(),
      sub: tokenInfo //  or may be user after login
    };
    //
    const token = issueToken(playload); // not public

    console.log('playload ->', info);
    console.log(
      'decrypt  ->',
      mayBeParse(decryptToken(Buffer.from(token, 'base64').toString()))
    ); // not public

    const infoTime = {
      now: new Date().addHours(0),
      expires: new Date().addHours(1)
    };
    // and response here
    cb({
      code: 0,
      status: 'success',
      __dyn: token,
      ttstamp: infoTime.now,
      expires: infoTime.expires
    });
  }
};

module.exports = User;
