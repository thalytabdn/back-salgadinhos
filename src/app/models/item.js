'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Item.hasMany(models.Flavor, { foreignKey: 'itemId', as: 'flavors' });

      Item.hasMany(models.PurchaseItem, { foreignKey: 'itemId', as: 'purchaseItems' });
    }
  }
  Item.init({
    name: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    itemClass: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};