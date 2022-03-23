'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'movies',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'books',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'music',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'games',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
