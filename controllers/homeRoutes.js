const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("homepage");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
