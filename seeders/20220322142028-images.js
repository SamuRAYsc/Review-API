'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('images', [
      {
        url: 'https://storage.googleapis.com/support-forums-api/attachment/message-77409770-16160901940388739521.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://storage.googleapis.com/support-forums-api/attachment/message-77302046-4214042578530379031.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.google.com/chrome/static/images/download-browser/big_pixel_phone.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://i.ytimg.com/vi/by-kTJ0DOLc/maxresdefault.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('images', null, {});
  }
};
