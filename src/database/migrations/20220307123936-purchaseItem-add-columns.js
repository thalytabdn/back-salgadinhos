'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'PurchaseItems',
      'flavorId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Flavors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(
      'PurchaseItems',
      'flavorId',
    );
  }
};
