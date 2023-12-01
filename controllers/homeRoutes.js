const router = require("express").Router();
const Chatroom = require("../models/Chatroom");

router.get("/", async (req, res) => {
  res.redirect("/login");
});

router.get("/testing", async (req, res) => {
  // if (!req.session.logged_in) {
  //   res.redirect("/login");
  //   return;
  // }
  try {
    const chatroomData = await Chatroom.findAll({});

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    res.render("testing", {
      chatrooms: chatrooms,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
