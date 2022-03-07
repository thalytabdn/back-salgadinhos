'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Items',
      'itemClass',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(
      'Items',
      'itemClass',
    );
  }
};
