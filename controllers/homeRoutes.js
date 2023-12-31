const router = require("express").Router();
const Chatroom = require("../models/Chatroom");
const User = require("../models/User");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
  res.redirect("/login");
});

router.get("/user/:username", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const otherUserData = await User.findAll({
      where: {
        username: req.params.username,
      },
      attributes: { exclude: ["password"] },
      raw: true,
    });

    // unfortunately, just including the User Blog models above causes the objects to be difficult to work. Instead we
    // grab the users id and then find their blog data like normal
    const blogData = await Blog.findAll({
      where: { user_id: otherUserData[0].id },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    const userBlogs = blogs.map((blog) => {
      return {
        isAuthor: blog.user_id === req.session.user_id,
        ...blog,
      };
    });

    const chatroomData = await Chatroom.findAll({});

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog, attributes: ["tag"] }],
    });

    const user = userData.get({ plain: true });

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    const userChatrooms = chatrooms.map((chatroom) => {
      const hasTag = user.blogs.some((blog) => blog.tag === chatroom.title);
      return {
        userHasTag: hasTag,
        ...chatroom,
      };
    });

    res.render("profile", {
      chatrooms: userChatrooms,
      blogs: userBlogs,
      username: otherUserData[0].username,
      logged_in: req.session.logged_in,
      currentUser:
        otherUserData[0].username.toLowerCase() ===
        req.session.username.toLowerCase(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// logged in user route from the Profile button on the main layout
router.get("/profile", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    const userBlogs = blogs.map((blog) => {
      return {
        isAuthor: blog.user_id === req.session.user_id,
        ...blog,
      };
    });

    const chatroomData = await Chatroom.findAll({});

    //find username for render
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog, attributes: ["tag"] }],
    });

    const user = userData.get({ plain: true });

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    const userChatrooms = chatrooms.map((chatroom) => {
      const hasTag = user.blogs.some((blog) => blog.tag === chatroom.title);
      return {
        userHasTag: hasTag,
        ...chatroom,
      };
    });

    res.render("profile", {
      chatrooms: userChatrooms,
      blogs: userBlogs,
      username: user.username,
      logged_in: req.session.logged_in,
      currentUser: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
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

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog, attributes: ["tag"] }],
    });

    const user = userData.get({ plain: true });

    const chatroomData = await Chatroom.findAll({});

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    // checking if user has a blog with the chatroom tag
    const userChatrooms = chatrooms.map((chatroom) => {
      const hasTag = user.blogs.some((blog) => blog.tag === chatroom.title);
      return {
        userHasTag: hasTag,
        ...chatroom,
      };
    });

    res.render("blog", {
      ...blog,
      chatrooms: userChatrooms,
      comments: authorComments,
      logged_in: req.session.logged_in,
      isAuthor: blog.user_id === req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home", async (req, res) => {
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

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog, attributes: ["tag"] }],
    });

    const user = userData.get({ plain: true });

    const chatroomData = await Chatroom.findAll({});

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    // checking if user has a blog with the chatroom tag
    const userChatrooms = chatrooms.map((chatroom) => {
      const hasTag = user.blogs.some((blog) => blog.tag === chatroom.title);
      return {
        userHasTag: hasTag,
        ...chatroom,
      };
    });

    const userBlogs = blogs.map((blog) => {
      const hasBlog = blog.user_id === req.session.user_id;
      return {
        userHasBlog: hasBlog,
        ...blog,
      };
    });

    res.render("mainpage", {
      chatrooms: userChatrooms,
      blogs: userBlogs,
      username: user.username,
      logged_in: req.session.logged_in,
      isAuthor: blogs.id === req.session.id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tag/:tag", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
  try {
    const blogData = await Blog.findAll({
      where: { tag: req.params.tag },
      include: [{ model: User, attributes: ["username"] }],
    });

    const blog = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog, attributes: ["tag"] }],
    });
    const user = userData.get({ plain: true });

    const chatroomData = await Chatroom.findAll({});

    const chatrooms = chatroomData.map((chatroom) =>
      chatroom.get({ plain: true })
    );

    // checking if user has a blog with the chatroom tag
    const userChatrooms = chatrooms.map((chatroom) => {
      const hasTag = user.blogs.some((blog) => blog.tag === chatroom.title);
      return {
        userHasTag: hasTag,
        ...chatroom,
      };
    });

    res.render("tags", {
      blogs: blog,
      chatrooms: userChatrooms,
      logged_in: req.session.logged_in,
      tag: req.params.tag,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("login");
});

module.exports = router;
