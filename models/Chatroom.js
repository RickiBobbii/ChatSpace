const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chatroom extends Model {}

Chatroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  },
  {
    hooks: {
      beforeCreate: function (chatroom) {
        chatroom.title = chatroom.title.toLowerCase();
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "chatroom",
  }
);

module.exports = Chatroom;
