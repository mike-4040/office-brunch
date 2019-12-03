
module.exports = function(sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING
  });
  return Company;
};
