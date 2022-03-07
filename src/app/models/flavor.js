'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flavor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flavor.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
      });
    }
  }
  Flavor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flavor',
  });
  return Flavor;
};