module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    country: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    zip_code: DataTypes.STRING
  });

  Address.associate = function(models) {
    Address.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
  };

  return Address;
};
