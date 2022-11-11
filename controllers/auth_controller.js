const authToken = require("../utils/auth_token");
const encryptDecryptPassword = require("../utils/enc_dec_password");
const db = require("../models");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: { email: email },
    });
    if (!user) {
      res.render("login", { error: "User not found try again!" });
    } else {
      const accessToken = authToken.createToken(user.id, user.email);
      const isPasswordCorrect =
        password === encryptDecryptPassword.decryptPassword(user.password)
          ? true
          : false;
      console.log(isPasswordCorrect);
      if (isPasswordCorrect == false) {
        res.render("login", { error: "incorrect password try again!" });
      } else {
        var session = req.session;
        session.user = user;
        session.accessToken = accessToken;
        if (session.user.role === "admin") {
          res.redirect(302, "/admin");
        } else if (
          session.user.role === "employee" ||
          session.user.role === "Employee"
        ) {
          res.redirect(302, "/main");
        } else if (
          session.user.role === "moderator" ||
          session.user.role === "Moderator"
        ) {
          res.redirect(302, "/moderator");
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.render("login", { error: "invalid email or password" });
  }
};
const logout = async (req, res) => {
  req.session.destroy();
  res.redirect(302, "/");
};

module.exports = { login, logout };
