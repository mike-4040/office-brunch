const db = require('../models');

db.sequelize
  .sync({force: true})
  .then(() => console.log('Models synced'))
  .catch(err => console.log(err));
  