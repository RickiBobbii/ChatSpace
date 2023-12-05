const router = require("express").Router();
const { Blog, Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const newBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
        date_created: Date.now(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET blog by id
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
