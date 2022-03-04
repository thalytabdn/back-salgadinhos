'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchaseItem.belongsTo(models.Item, {
        foreignKey: 'itemId',
        as: 'item',
      });
    }
  }
  PurchaseItem.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PurchaseItem',
  });
  return PurchaseItem;
};