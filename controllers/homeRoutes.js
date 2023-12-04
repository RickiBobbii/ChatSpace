const router = require("express").Router();
const Chatroom = require("../models/Chatroom");
const User = require("../models/User");
const Blog = require("../models/Blog");

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

//     res.render("profile-test", {
//       ...user,
//       // logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// profile test route
router.get("/profile", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try { 
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"]},
      include: [
        {model: Blog}
      ]
    });
    const user = userData.get({ plain:true });
    
    res.render("profile", {
      user_id: user,
      logged_in: req.session.logged_in,
    })
    } catch (err) {
      res.status(400).json(err);
    };
});

router.get("/testing", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    const chatroomData = await Chatroom.findAll({});

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    res.render("testing", {
      chatrooms: chatrooms,
      blogs: blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/testing");
    return;
  }
  res.render("login");
});

module.exports = router;
