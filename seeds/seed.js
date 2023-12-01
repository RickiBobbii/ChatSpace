const sequelize = require("../config/connection");
const { Chatroom, User, Animal, Movie, Music, Project } = require("../models");

const chatroomData = require("./chatroomData.json");
const userData = require("./userData.json");
const animalData = require('./animalData.json');
const movieData = require('./movieData.json');
const musicData = require('./musicData.json');
const projectData = require('./projectData.json');

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

  for (const animal of animalData) {
    await Animal.create({
      ...animal,
    });
  };

  for (const movie of movieData) {
    await Movie.create({
      ...movie,
    });
  };

  for (const music of musicData) {
    await Music.create({
      ...music,
    });
  };

  for (const project of projectData) {
    await Project.create({
      ...project,
    });
  };

  process.exit(0);
};

seedDatabase();
