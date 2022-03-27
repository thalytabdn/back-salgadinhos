'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feedback.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Feedback.init({
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    evaluation: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};