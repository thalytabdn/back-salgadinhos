'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Flavors', 'itemId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Items',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.removeColumn(
      'Items',
      'flavorId',
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Flavors',
      'itemId',
    );
    await queryInterface.addColumn('Items', 'flavorId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Flavors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
