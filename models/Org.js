const connection = require('./connection');
const { orgMap } = require('./maps');
const { toJS } = require('./jsToSqlMaps');

const Org = {
  all: cb =>
    connection.query(
      'SELECT org_id, org_name FROM org WHERE active = 1 AND admin = 0',
      (err, res) => {
        let reply = {};
        if (err)
          reply = { code: 1, payload: 'Database Error' };
        else if (res.length === 0)
          reply = { code: 2, payload: 'No Companies in DB' };
        else
          reply = { code: 0, payload: res.map(org => toJS(org, orgMap)) };
        cb(reply);
      }
    )
};

module.exports = Org;
