const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/event-detail", async (req, res) => {
  const id = req.query.id;
  try {
    const event = await db.Event.findOne({
      where: { id: id },
    });
    res.render("event_detail", {
      event: event,
    });
  } catch (error) {
    console.log(error);
    req.flash("message", "Something went wrong");
    res.redirect(302, "/");
  }
});

module.exports = router;
