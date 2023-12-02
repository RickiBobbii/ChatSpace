const router = require("express").Router();
const Chatroom = require("../models/Chatroom");
const User = require("../models/User");

router.get("/", async (req, res) => {
  res.redirect("/login");
});

// router.get("user/:username", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       where: {
//         username: req.params.username,
//       },
//       attributes: { exclude: ["password"] },
//       include: [{ model: Blog }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("profile", {
//       ...user,
//       // logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
