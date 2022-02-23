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
      Flavor.hasMany(models.Item, { foreignKey: 'flavorId', as: 'itens' });
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