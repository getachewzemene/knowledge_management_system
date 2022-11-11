const express = require("express");
const authController = require("../controllers/auth_controller");
const router = express.Router();
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", authController.login);
router.get("/logout", authController.logout);
module.exports = router;
