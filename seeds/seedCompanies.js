const db = require('../models1');

const companies = [
  {
    companyName: 'Company 1'
  },
  {
    companyName: 'Company 2'
  },
  {
    companyName: 'Office Brunch',
    admin: true
  }
];

db.Company
  .sync({force: false})
  .then(db.Company.bulkCreate(companies))
  .catch(err => console.log(err));