const isLogin = (req, res, next) => {
  var session = req.session;
  // console.log(session.user);
  if (session.user === undefined || session.user === null) {
    res.redirect(302, "/login");
  } else {
    next();
  }
};

module.exports = { isLogin };
