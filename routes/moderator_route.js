const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const moderatorController = require("../controllers/moderator_controller");
router.get("/moderator", auth.isLogin, async (req, res) => {
  var session = req.session;
  if (session.user.role !== "moderator") {
    res.redirect(302, "/access-denied");
  } else {
    const allPost = await db.Post.findAll({
      where: { status: "pending" },
      include: [{ model: db.User, as: "postUser" }],
    });
    res.render("moderator", {
      posts: allPost,
      message: req.flash("message"),
    });
  }
});
router.post("/moderator/post/verify", moderatorController.verifyPost);
module.exports = router;
