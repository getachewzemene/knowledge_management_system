const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../models");
router.get("/", async (req, res) => {
  const allEvent = await db.Event.findAll({});
  const allNews = await db.News.findAll({});
  var session = req.session;
  const user = session.user !== undefined ? session.user : null;
  res.render("index", {
    event: allEvent,
    news: allNews,
    user: user,
    message: req.flash("message"),
  });
});
router.get("/access-denied", (req, res) => {
  res.render("access_denied");
});
module.exports = router;
