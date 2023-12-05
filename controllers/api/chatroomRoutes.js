const router = require("express").Router();
const { Chatroom } = require("../../models");

router.post("/", async (req, res) => {
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

router.get("/rooms", async (req, res) => {
  try {
    const chatroomData = await Chatroom.findAll();

    const rooms = chatroomData.map((chatroom) =>
    chatroom.get({ plain: true })
  );

    res.status(200).json(rooms);
  } catch (err) {
    res.status(400).json(err);
    console.log("error");
  }
});

module.exports = router;
