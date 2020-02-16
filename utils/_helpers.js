/*global process Buffer */
/**
 * @aat
 * started 14/02/2020
 * time 14:20
 * */

/**
 * @aat
 * started 11/02/2020
 * */
const CryptoJS = require('crypto-js');
const SOMEVARFORAPPS = process.env.SOMEVARFORAPPS;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const moment = require('moment');
const expDays = 7; // 1 one day expired expiration
const jwt = require('jsonwebtoken');

function decryptToken(data) {
  var decrypted = CryptoJS.AES.decrypt(data, TOKEN_SECRET);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function issuePublicToken(info) {
  var tokenInfo = CryptoJS.AES.encrypt(JSON.stringify(info), SOMEVARFORAPPS);
  return new Buffer(tokenInfo.toString()).toString('base64');
}

function issueToken(info) {
  var tokenInfo = CryptoJS.AES.encrypt(JSON.stringify(info), TOKEN_SECRET);
  return new Buffer(tokenInfo.toString()).toString('base64');
}

function decryptPublicToken(data) {
  var decrypted = CryptoJS.AES.decrypt(data, SOMEVARFORAPPS);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function mayBeParse(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return s;
  }
}

function encodeToken(user) {
  console.log('encodeToken user->', user);
  console.log('encodeToken now ->', moment().unix());
  console.log(
    'encodeToken exp ->',
    moment()
      .add(1, 'days')
      .unix()
  );
  if (user) {
    const playload = {
      exp: moment()
        .add(expDays, 'days')
        .unix(), /// days ?
      iat: moment().unix(),
      sub: user //  user
    };
    return jwt.encode(playload, TOKEN_SECRET);
  } else {
    return null;
  }
}

function decodeToken(token, callback) {
  try {
    const payload = jwt.decode(token, TOKEN_SECRET);
    const now = moment().unix();
    // check if the token has expired
    if (now > payload.exp) callback('Token has expired', null);
    else callback(null, payload);
  } catch (error) {
    console.log('decodeToken.error -> ', error);
    callback(error.message, null);
  }
}

function refreshToken(user) {
  if (user) {
    const playload = {
      exp: moment()
        .add(expDays, 'days')
        .unix(), /// days
      iat: moment().unix(),
      sub: user //  user
    };
    return jwt.encode(playload, process.env.TOKEN_SECRET);
  } else {
    return null;
  }
}

module.exports = {
  decryptToken,
  decryptPublicToken,
  issuePublicToken,
  issueToken,
  mayBeParse,
  encodeToken,
  decodeToken,
  refreshToken
};
