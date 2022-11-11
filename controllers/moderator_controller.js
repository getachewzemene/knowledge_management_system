const db = require("../models");
const generateId = require("../utils/generate_id");
const verifyPost = async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  var session = req.session;
  const moderatorId = session.user.id;
  const department = req.body.department;
  let targetGroup = [];
  const isArray = Array.isArray(department);
  if (isArray) {
    for (let i = 0; i < department.length; i++) {
      targetGroup.push({
        id: generateId(),
        department: department[i],
        postId: id,
      });
    }
  }
  console.log(targetGroup.length, isArray);
  try {
    const updatePost = await db.Post.update(
      {
        status: status,
        verifiedBy: moderatorId,
      },
      { where: { id: id }, returning: true }
    );
    if (!updatePost) {
      req.flash("message", "update post failed try again!");
      res.redirect(302, "/moderator");
    } else {
      const newTargetGroup =
        targetGroup.length != 0
          ? await db.TargetGroup.bulkCreate(targetGroup)
          : await db.TargetGroup.create({
              id: generateId(),
              department: department,
              postId: id,
            });
      if (!newTargetGroup) {
        req.flash("message", "unable to add target group try again!");
        res.redirect(302, "/moderator");
      } else {
        req.flash("message", "post verified successfully!");
        res.redirect(302, "/moderator");
      }
    }
  } catch (error) {
    req.flash("message", "internal error occured try again!");
    res.redirect(302, "/moderator");
  }
};

module.exports = { verifyPost };
