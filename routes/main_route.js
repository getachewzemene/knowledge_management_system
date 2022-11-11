const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/auth");
const userController = require("../controllers/user_controller");
router.get("/main", auth.isLogin, async (req, res) => {
  const allUser = await db.User.findAll({});
  const maleUser = await db.User.count({
    where: { gender: "male" },
    distinct: "id",
  });
  const femaleUser = await db.User.count({
    where: { gender: "female" },
    distinct: "id",
  });
  const userEachDepartment = await employeeDepartment();
  const allPost = await db.Post.findAll({
    where: { status: "accepted" },
    include: [
      { model: db.User, as: "postUser" },
      { model: db.User, as: "postVerifyUser" },
      {
        model: db.Comment,
        as: "postComment",
        include: [{ model: db.User, as: "commentUser" }],
      },
      { model: db.TargetGroup, as: "postTargetGroup" },
    ],
  });
  const allComments = await db.Comment.findAll({});
  // console.log(allPost[0]);
  res.render("main", {
    user: req.session.user,
    posts: allPost,
    totalMale: maleUser,
    totalFemale: femaleUser,
    users: allUser,
    comments: allComments,
    userDepartment: userEachDepartment,
    message: req.flash("message"),
  });
});
const employeeDepartment = async () => {
  try {
    const userDepartment = await db.User.findAll({
      attributes: [
        "department",
        [db.sequelize.fn("COUNT", db.sequelize.col("department")), "count"],
      ],
      group: "department",
      raw: true,
      logging: true,
    });
    return userDepartment;
  } catch (error) {
    console.log(error);
  }
};
router.post(
  "/main/change-password",
  auth.isLogin,
  userController.changePassword
);
module.exports = router;
