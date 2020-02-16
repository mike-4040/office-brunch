// this file is for manual testing of toJS and toSQL functions

const { userMap } = require('./maps');
const { toJS, toSQL } = require('./jsToSqlMaps');

const userSQL = { id: 11, firstName: 'Mike', lastName: 'Kravtsov', email: 'hello@site.com' };
const userJS = { id: 11, firstName: 'Andrew', lastName: 'Toropov' };

console.log('SQL:       ', userSQL);
console.log('Map to JS: ', toJS(userSQL, userMap));

console.log('JS:         ', userJS);
console.log('Map to SQL: ', toSQL(userJS, userMap));

console.log('Empty {}     ', {});
console.log('{} to SQL:   ', toSQL({}, userMap));
