'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Purchases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM,
        values: ['PROGRESS', 'CANCELED', "PROCESSING", "APPROVAD", "FINISHED"],
        defaultValue: 'PROGRESS',
      },
      paymentMethod: {
        type: Sequelize.ENUM,
        values: ['PIX', 'DEBITO', "CREDITO", "DINHEIRO"],
        defaultValue: 'DINHEIRO',
      },
      deliveryMethod: {
        type: Sequelize.ENUM,
        values: ['ENVIO', 'RETIRADA'],
        defaultValue: 'RETIRADA',
      },
      price: {
        type: Sequelize.FLOAT
      },
      deliveryPrice: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      totalPrice: {
        type: Sequelize.FLOAT
      },
      transshipment: {
        type: Sequelize.FLOAT
      },
      details: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      hour: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Purchases');
  }
};