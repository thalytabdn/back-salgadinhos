/* eslint no-param-reassign: "error" */

'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Address, { foreignKey: 'userId', as: 'address' });
      User.hasMany(models.Feedback, { foreignKey: 'userId', as: 'feedbacks' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cellPhone: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user'],
      defaultValue: "user"
    },
    password: DataTypes.VIRTUAL,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });


  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 5);
    }

    return user;
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  return User;
};