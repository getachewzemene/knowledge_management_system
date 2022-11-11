const express = require("express");
const router = express.Router();

router.get("/ebook", (req, res) => {
  res.render("ebook");
});

module.exports = router;
