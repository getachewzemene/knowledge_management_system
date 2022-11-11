const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/news-detail", async (req, res) => {
  const id = req.query.id;
  try {
    const news = await db.News.findOne({
      where: { id: id },
    });
    res.render("news_detail", {
      news: news,
    });
  } catch (error) {
    console.log(error);
    req.flash("message", "Something went wrong");
    res.redirect(302, "/");
  }
});

module.exports = router;
