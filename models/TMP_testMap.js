const { userMap } = require('./maps');
const { toJS, toSQL } = require('./jsToSqlMaps');

const userSQL = { id: 11, firstName: 'Mike', lastName: 'Kravtsov', email: 'hello@site.com' };
const userJS = { id: 11, firstName: 'Andrew', lastName: 'Toropov' };

console.log(userSQL);
console.log(toJS(userSQL, userMap));

console.log(userJS);
console.log(toSQL(userJS, userMap));
