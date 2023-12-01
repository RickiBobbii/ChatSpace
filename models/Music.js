const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Music extends Model {}

Music.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      band_name: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'music',
    }
);
  
module.exports = Music;