const express = require("express");
const post_controller = require("../controllers/post_controller");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../models");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/posts");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
});
router.get("/main/post/detail", async (req, res) => {
  const id = req.query.id;
  // console.log(id);
  try {
    const post = await db.Post.findOne({
      where: { id: id },
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
    res.render("post_detail", {
      post: post,
    });
  } catch (error) {
    console.log(error);
    req.flash("message", "Something went wrong");
    res.redirect(302, "/main");
  }
});
// router.get("/main/post/detail/generate-pdf", post_controller.generatePdf);
router.post("/main/post/add", upload.single("file"), post_controller.addPost);
// router.get("/main/post/all", post_controller.getAllPost);
router.post("/main/post/comment/add", post_controller.addComment);
router.post("/profile/post/update", post_controller.updatePost);
router.post("/profile/post/delete", post_controller.deletePost);
module.exports = router;
