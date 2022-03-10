'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Creation.belongsTo(models.Category, {foreignKey:'category_id'});
      Creation.hasMany(models.Review, {foreignKey:'id'});
      Creation.belongsToMany(models.User, {through: models.Ratings, foreignKey: 'id', otherKey: 'creation_id'});
      Creation.belongsToMany(models.Image, {through: models.Image_imageable, foreignKey: 'id', otherKey: 'imageable_id'});
    }
  }
  Creation.init({
    name: DataTypes.STRING,
    average_rating: DataTypes.REAL,
    image_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Creation',
  });
  return Creation;
};