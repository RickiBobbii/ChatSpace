const sequelize = require("../config/connection");
const { Chatroom, User } = require("../models");

const chatroomData = require("./chatroomData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const chatrooms = await Chatroom.bulkCreate(chatroomData, {
    individualHooks: true,
    returning: true,
  });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
