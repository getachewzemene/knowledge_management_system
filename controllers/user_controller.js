const db = require("../models");
const encryptDecryptPassword = require("../utils/enc_dec_password");
const profile = async (req, res) => {
  try {
    if (req.session.user !== undefined) {
      const user = await db.User.findOne({
        where: { id: req.session.user.id },
        include: [
          {
            model: db.Post,
            as: "userPost",
            required: false,
            where: { status: "pending" },
          },
        ],
      });
      res.render("profile", { user: user, message: req.flash("message") });
    } else {
      res.redirect(302, "/");
    }
  } catch (error) {
    console.log(error);
    req.flash("message", "Something went wrong");
    res.redirect(302, "/main");
  }
};
const changePassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const user = await db.User.findOne({ where: { id: userId } });

    const isMatch =
      oldPassword === encryptDecryptPassword.decryptPassword(user.password)
        ? true
        : false;
    if (isMatch === false) {
      req.flash("message", "Old password is incorrect");
      res.redirect(302, "/main");
    } else {
      const hashPassword = encryptDecryptPassword.encryptPassword(newPassword);
      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: { id: userId },
          returning: true,
        }
      );
      req.flash("message", "Password changed successfully");
      res.redirect(302, "/main");
    }
  } catch (error) {
    console.log(error);
    req.flash("message", "Something went wrong");
    res.redirect(302, "/main");
  }
};
module.exports = {
  profile,
  changePassword,
};
