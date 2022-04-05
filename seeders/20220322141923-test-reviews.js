'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reviews', [
      {
        name: 'Не зашло,не понравилось',
        description: 'Lorem ipsum dolor sit amet. Ut iusto omnis ex earum itaque et velit exercitationem ut tempora cupiditate id placeat molestiae in earum aperiam. Eum molestias molestiae et consequuntur.',
        author_id: '2',
        creation_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Вот это кайф',
        description: 'Lorem ipsum dolor sit amet. Ut iusto omnis ex earum itaque et velit exercitationem ut tempora cupiditate id placeat molestiae in earum aperiam. Eum molestias molestiae et consequuntur.',
        author_id: '2',
        creation_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ну это классика, конечно',
        description: 'Lorem ipsum dolor sit amet. Ut iusto omnis ex earum itaque et velit exercitationem ut tempora cupiditate id placeat molestiae in earum aperiam. Eum molestias molestiae et consequuntur.',
        author_id: '3',
        creation_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
