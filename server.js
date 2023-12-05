const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server);

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

io.on("connection", (socket) => {
  socket.on("join", function (room) {
    socket.join(room);
    socket.room = room;
    console.log("User connected to room:", socket.room);
  });

  socket.on("newuser", function (username) {
    socket.broadcast.emit("userJoined", username + " joined the conversation");
  });
  socket.on("exituser", function (username) {
    socket.broadcast.emit("userJoined", username + " left the conversation");
  });

  socket.on("chat", function (message) {
    socket.to(socket.room).emit("chat", message);
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () =>
    console.log("Now listening at http://localhost:" + PORT)
  );
});
