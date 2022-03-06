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
    status: {
      type: DataTypes.ENUM,
      values: ['PROGRESS', 'CANCELED', "PROCESSING", "APPROVAD", "FINISHED"],
      defaultValue: "PROGRESS",
    },
    paymentMethod: {
      type: DataTypes.ENUM,
      values: ['PIX', 'DEBITO', "CREDITO", "DINHEIRO"],
      defaultValue: 'DINHEIRO',
    },
    deliveryMethod: {
      type: DataTypes.ENUM,
      values: ['ENVIO', 'RETIRADA'],
      defaultValue: 'RETIRADA',
    },
    price: DataTypes.FLOAT,
    deliveryPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT,
    transshipment: DataTypes.FLOAT,
    details: DataTypes.STRING,
    date: DataTypes.STRING,
    hour: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};