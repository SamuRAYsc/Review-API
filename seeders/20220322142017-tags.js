'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tags', [
      {
        name: 'shooter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'arcanoid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'racing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'strategy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'thriller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'comedy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'drama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'documentary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'rock',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'classic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'rap',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'techno',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'fantasy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'romance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sci-fi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
