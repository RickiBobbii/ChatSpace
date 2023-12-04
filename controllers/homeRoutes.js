const router = require("express").Router();
const Chatroom = require("../models/Chatroom");
const User = require("../models/User");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

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

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const commentData = await Comment.findAll({
      where: {
        blog_id: req.params.id,
      },
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    const blog = blogData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    const authorComments = comments.map((comment) => {
      return {
        userIsAuthor: comment.user_id === req.session.user_id,
        ...comment,
      };
    });

    res.render("blog", {
      ...blog,
      comments: authorComments,
      logged_in: req.session.logged_in,
      isAuthor: blog.user_id === req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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

    //testing find username for render
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog, attributes: ["tag"] }],
    });

    const user = userData.get({ plain: true });

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    const userChatrooms = chatrooms.map((chatroom) => {
      const hasTag = user.blogs.some(
        (blog) => blog.tag === chatroom.title.toLowerCase()
      );
      return {
        userHasTag: hasTag,
        ...chatroom,
      };
    });

    console.log(userChatrooms);

    res.render("testing", {
      chatrooms: userChatrooms,
      blogs: blogs,
      username: user.username,
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
