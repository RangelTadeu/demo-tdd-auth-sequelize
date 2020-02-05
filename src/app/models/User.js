const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      password: DataTypes.VIRTUAL
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  User.associate = models => {
    User.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
  };

  //compara a senha enviada com o hash no banco de dados
  User.prototype.checkPasswordHash = function(pass) {
    return bcrypt.compare(pass, this.password_hash);
  };

  //gera o token do usuário
  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};
