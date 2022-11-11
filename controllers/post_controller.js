const db = require("../models");
const generateId = require("../utils/generate_id");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const addPost = async (req, res) => {
  const id = generateId();
  const filePath = req.file !== undefined ? req.file.path : null;
  var session = req.session;
  const userId = session.user.id;
  const { title, content } = req.body;
  console.log(req.body);
  console.log(filePath);
  try {
    const isPostFound = await db.Post.findOne({
      where: { title: title },
    });
    if (!isPostFound) {
      const newPost = await db.Post.create({
        id: id,
        title: title,
        content: content,
        filePath: filePath,
        postedBy: userId,
        verifiedBy: null,
      });
      if (!newPost) {
        req.flash("message", "add new post failed try again!");
        res.redirect(302, "/main");
      }

      req.flash("message", "new post added successfully!");
      res.redirect(302, "/main");
    } else {
      req.flash("message", "post already found try again");
      res.redirect(302, "/main");
    }
  } catch (error) {
    console.log(error);
    req.flash("message", "internal error occured try again!");
    res.redirect(302, "/main");
  }
};
const getAllPost = async (req, res) => {
  try {
    const allPost = await db.Post.findAll({
      where: {},
    });
    if (!addPost) {
      req.flash("message", "no post found"), res.redirect(302, "/main");
    } else {
      return allPost;
    }
  } catch (err) {
    console.log(err);
    req.flash("message", "internal error occured try again!");
    res.redirect(302, "/main");
  }
};
const addComment = async (req, res) => {
  const id = generateId();
  const { postId, comment } = req.body;
  var session = req.session;

  const userId = session.user.id;
  // console.log(id, postId, comment, userId);
  try {
    const isCommentFound = await db.Comment.findOne({
      where: { content: comment },
    });
    if (!isCommentFound) {
      const newCOmment = await db.Comment.create({
        id: id,
        content: comment,
        userId: userId,
        postId: postId,
      });
      res.redirect(302, "/main");
    } else {
      req.flash("message", "comment already found try again");
      res.redirect(302, "/main");
    }
  } catch (err) {
    console.log(err);
    req.flash("message", "internal error occured try again!");
    res.redirect(302, "/main");
  }
};
const updatePost = async (req, res) => {
  const { postId, title, content } = req.body;
  console.log(postId, title, content);
  try {
    const isPostFound = await db.Post.findOne({
      where: { id: postId },
    });
    if (isPostFound) {
      const updatePost = await db.Post.update(
        {
          title: title,
          content: content,
        },
        {
          where: { id: postId },
          returning: true,
        }
      );
      req.flash("message", "post updated successfully!");
      res.redirect(302, "/profile");
    } else {
      req.flash("message", "post not found try again");
      res.redirect(302, "/profile");
    }
  } catch (err) {
    console.log(err);
    req.flash("message", "internal error occurred try again!");
    res.redirect(302, "/profile");
  }
};
const deletePost = async (req, res) => {
  const { postId } = req.body;
  // console.log(postId);
  try {
    const isPostFound = await db.Post.findOne({
      where: { id: postId },
    });
    if (isPostFound) {
      const deletePost = await db.Post.destroy({
        where: { id: postId },
        returning: true,
      });
      req.flash("message", "post deleted successfully!");
      res.redirect(302, "/profile");
    } else {
      req.flash("message", "post not found try again!");
      res.redirect(302, "/profile");
    }
  } catch (err) {
    req.flash("message", "internal error occured try again!");
    res.redirect(302, "/profile");
  }
};
// const generatePdf = async (req, res) => {
//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//     });
//     const page = await browser.newPage();
//     const html = fs.readFileSync(
//       path.join(__dirname, "../views", "post_detail.ejs"),
//       "utf8"
//     );
//     await page.setContent(html, {
//       waitUntil: "domcontentloaded",
//     });
//     const pdfBuffer = await page.pdf({
//       path: path.join(__dirname, "..", "..", "post_detail.pdf"),
//       margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
//       printBackground: true,
//       format: "A4",
//     });
//     await browser.close();
//     req.flash("message", "file dowloaded successfully");
//     res.redirect(302, "/main");
//   } catch (error) {
//     console.log(error);
//     req.flash("message", "Something went wrong");
//     res.redirect(302, "/main");
//   }
// };
module.exports = {
  addPost,
  getAllPost,
  addComment,
  updatePost,
  deletePost,
  // generatePdf,
};
