const router = require("express").Router();
const { Chatroom } = require("../../models");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Chatroom.create({
      ...req.body,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const chatroomData = await Chatroom.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!chatroomData) {
      res.status(404).json({ message: "No chatroom found with this id!" });
      return;
    }

    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all chatrooms
//api routes for User
router.get('/', async (req, res) => {
  try {
    const chatroomData = await Chatroom.findAll({
    });
    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
