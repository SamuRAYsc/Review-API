'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('creations', [
      {
        name: 'Spider-Man',
        average_rating: 2.8,
        image_id: 1,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rage against the machine',
        average_rating: 4.5,
        image_id: 1,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Quake2',
        average_rating: 5.0,
        image_id: 1,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Macbeth',
        average_rating: 4.0,
        image_id: 1,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'OSU!',
        average_rating: 5.0,
        image_id: 1,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'StarCraft2',
        average_rating: 5.0,
        image_id: 1,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('creations', null, {});
  }
};
