const express = require("express");
const multer = require("multer");
const path = require("path");
const encryptDecryptPassword = require("../utils/enc_dec_password");
const auth = require("../middleware/auth");
const db = require("../models");
const admin_controller = require("../controllers/admin_controller");
const { off } = require("process");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/event_image");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
});

router.get("/admin", auth.isLogin, async (req, res) => {
  var session = req.session;
  if (session.user.role !== "admin") {
    res.redirect(302, "/access-denied");
  } else {
    const totalUser = await db.User.findAll({});
    var pageSize = 3;
    var pageCount = Math.ceil(totalUser.length / pageSize);
    var currentPage = 0;
    // console.log(req.query.page);
    if (req.query.page !== undefined) {
      currentPage += Number.parseInt(req.query.page);
    }
    const offset = currentPage > 1 ? (currentPage - 1) * pageSize : currentPage;
    // console.log(offset);
    const userList = await db.User.findAll({
      offset: offset,
      limit: pageSize,
    });
    // console.log(userList.length);
    for (var i = 0; i < userList.length; i++) {
      userList[i].password = encryptDecryptPassword.decryptPassword(
        userList[i].password //get password from database and decrypt it
      );
    }
    const allPost = await db.Post.findAll({
      where: {},
      include: [{ model: db.User, as: "postUser" }],
    });
    const allNews = await db.News.findAll({});
    res.render("admin", {
      user: userList,
      post: allPost,
      news: allNews,
      pageSize: pageSize,
      totalUser: totalUser.length,
      pageCount: pageCount,
      currentPage: currentPage,
      message: req.flash("message"),
    });
  }
});
router.post("/admin/user/add", admin_controller.addUser);
router.post(
  "/admin/event/add",
  upload.single("file"),
  admin_controller.addEvent
);
router.post("/admin/news/add", admin_controller.addNews);
router.get("/admin/user/all", admin_controller.getAllUser);
router.post("/admin/import-data", admin_controller.importData);
router.post("/admin/user/update", admin_controller.updateUser);
router.post("/admin/user/delete", admin_controller.deleteUser);

module.exports = router;
