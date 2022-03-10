'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsToMany(models.Creation, {through: models.Image_imageable, foreignKey: 'id', otherKey: 'image_id'});
      Image.belongsToMany(models.Review, {through: models.Image_imageable, foreignKey: 'id', otherKey: 'image_id'});
    }
  }
  Image.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};