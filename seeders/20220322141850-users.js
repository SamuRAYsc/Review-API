'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: '123',
        password: await bcrypt.hash('321', 10),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'test',
        password: await bcrypt.hash('test', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'who',
        password: await bcrypt.hash('is', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
