/**
 * first is JS
 * second is SQL
 */

const userMap = [
  ['id', 'user_id'],
  ['firstName', 'first_name'],
  ['lastName', 'last_name'],
  ['email', 'email'],
  ['password', 'password'],
  ['CompanyId', 'org_id']
];

const orgMap = [
  ['id', 'org_id'],
  ['companyName', 'org_name'],
  ['active', 'active'],
  ['admin', 'admin']
];

module.exports = { userMap, orgMap };
