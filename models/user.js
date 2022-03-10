'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Review, {through: models.Likes, foreignKey: 'id', otherKey: 'user_id'});
      User.belongsToMany(models.Creation, {through: models.Ratings, foreignKey: 'id', otherKey: 'user_id'});
      User.belongsTo(models.Review);
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};