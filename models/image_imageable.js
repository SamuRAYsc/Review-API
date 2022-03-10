'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image_imageable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image_imageable.init({
    image_id: DataTypes.INTEGER,
    imageable_id: DataTypes.INTEGER,
    imageable_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image_imageable',
  });
  return Image_imageable;
};