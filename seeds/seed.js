const sequelize = require("../config/connection");
const { Chatroom } = require("../models");

const chatroomData = require("./chatroomData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Chatroom.bulkCreate(chatroomData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
