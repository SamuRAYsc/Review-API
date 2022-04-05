'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Review.belongsToMany(models.User, {through: models.Likes, foreignKey: 'id', otherKey: 'review_id'})
      Review.belongsToMany(models.Tag, {through: models.Review_tags, foreignKey: 'id', otherKey: 'review_id'})
      Review.belongsToMany(models.Image, {through: models.Image_imageable, foreignKey: 'id', otherKey: 'imageable_id'})
      Review.belongsTo(models.User, {foreignKey:'author_id'})
      Review.belongsTo(models.Creation, {foreignKey:'creation_id'})

    }
  }
  Review.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    author_id: DataTypes.INTEGER,
    creation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};