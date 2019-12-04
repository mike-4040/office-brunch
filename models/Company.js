
module.exports = function(sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false 
    }
  });
  return Company;
};
