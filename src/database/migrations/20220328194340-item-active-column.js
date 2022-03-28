'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Items',
      'active',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(
      'Items',
      'active',
    );
  }
};
