const connection = require('./connection');
const {companyMap} = require('./maps');
const { toJS } = require('./jsToSqlMaps');

const Company = {
  all: cb =>
    connection.query(
      'SELECT id, companyName FROM Companies WHERE active = 1 AND admin = 0',
      (err, res) => {
        let reply = {};
        if (err)
          reply = { code: 1, payload: 'Database Error', err };
        else if (res.length === 0)
          reply = { code: 2, payload: 'No Companies in DB' };
        else
          reply = { code: 0, payload: res.map(company => toJS(company, companyMap)) };
        cb(reply);
      }
    )
};

module.exports = Company;
