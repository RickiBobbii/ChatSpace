const User = require("./User");
const Category = require("./Category");
const Tag = require("./Tag");

User.hasMany(Category, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Category.belongsTo(User, {
  foreignKey: "user_id"
});

User.hasMany(Tag, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Tag.belongsTo(User, {
  foreignKey: "user_id"
});

Category.hasMany(Tag, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

Tag.belongsTo(Category, {
  foreignKey: "category_id"
});


module.exports = { User, Category, Tag }; 