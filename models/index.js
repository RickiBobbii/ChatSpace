const Chatroom = require("./Chatroom");
const User = require("./User");
const Blog = require("./Blog");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Chatroom, User, Blog };
