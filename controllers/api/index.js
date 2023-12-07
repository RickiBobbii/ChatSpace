const router = require("express").Router();
const userRoutes = require("./userRoutes");
const chatroomRoutes = require("./chatroomRoutes");
const blogRoutes = require("./blogRoutes");

router.use("/users", userRoutes);
router.use("/chatrooms", chatroomRoutes);
router.use("/blogs", blogRoutes);

module.exports = router;
