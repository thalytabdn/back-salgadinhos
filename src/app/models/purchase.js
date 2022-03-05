'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Purchase.hasMany(models.PurchaseItem, { foreignKey: 'purchaseId', as: 'purchaseItems' });
    }
  }
  Purchase.init({
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};