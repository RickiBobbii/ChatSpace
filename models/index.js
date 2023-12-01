const Chatroom = require("./Chatroom");
const Animal = require('./Animal');
const Movie = require('./Movie');
const Music = require('./Music');
const Project = require('./Project');
const User = require('./User');

User.hasMany(Animal, { 
    foreignKey: 'user_id',
});

User.hasMany(Movie, { 
    foreignKey: 'user_id',
});

User.hasMany(Music, { 
    foreignKey: 'user_id',
});

User.hasMany(Project, { 
    foreignKey: 'user_id',
});

Animal.belongsTo(User, {
    foreignKey: 'user_id',
});

Movie.belongsTo(User, {
    foreignKey: 'user_id',
});

Music.belongsTo(User, {
    foreignKey: 'user_id',
});

Project.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { Chatroom, User, Animal, Movie, Music, Project };