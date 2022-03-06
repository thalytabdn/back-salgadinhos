'use strict';


const bcrypt = require('bcryptjs');

const ADMIN_USER = {
  role: 'admin',
  name: 'ADMIN',
  email: 'admin@salgadinho.com',
  cellPhone: '999999999',
  createdAt: new Date(),
  updatedAt: new Date(),
};

let ADMIN_USER_ADDRESS_DATA = {
  street: "BQ", 
  number: "0", 
  city: "BOQUEIRÃO", 
  neighborhood: "CENTRO",
  createdAt: new Date(),
  updatedAt: new Date(),
}

module.exports = {
  up: async (queryInterface) => {
    ADMIN_USER.passwordHash = await bcrypt.hash('Admin12345', 5);
    const existingUsers = await queryInterface.rawSelect(
      'Users',
      { where: { email: ADMIN_USER.email } },
      ['id'],
    );
    if (!existingUsers || existingUsers.length === 0) {
      await queryInterface.bulkInsert('Users', [ADMIN_USER], {});

      const user = await queryInterface.rawSelect(
        'Users',
        { where: { email: ADMIN_USER.email } },
        ['id'],
      );

      ADMIN_USER_ADDRESS_DATA = {
        ...ADMIN_USER_ADDRESS_DATA,
        userId: user
      }

      await queryInterface.bulkInsert('Addresses', [ADMIN_USER_ADDRESS_DATA], {});

    } else {
      console.log(
        `Usuário '${ADMIN_USER.name}' com o cpf '${ADMIN_USER.email}' já existe.`,
      );
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
