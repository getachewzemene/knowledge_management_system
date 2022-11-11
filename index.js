const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const indexRoute = require("./routes/index_route");
const authRoute = require("./routes/auth_route");
const adminRoute = require("./routes/admin_route");
const mainRoute = require("./routes/main_route");
const moderatorRoute = require("./routes/moderator_route");
const postRoute = require("./routes/post_route");
const profileRoute = require("./routes/profile_route");
const eventRoute = require("./routes/event_route");
const newsRoute = require("./routes/news_route");
const helpRoute = require("./routes/help_route");
const ebookRouter = require("./routes/ebook_route");
const initDB = require("./models/index");
const server = express();
const PORT = process.env.PORT || 4000;
server.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
server.set("views", "./views");
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "./public")));
server.use(
  session({
    secret: "gk12gk19gk21",
    saveUninitialized: true,
    maxAge: Date.now() + 30 * 86400 * 1000,
    resave: false,
  })
);
server.use(cookieParser());
server.use(flash());
server.use(indexRoute);
server.use(authRoute);
server.use(adminRoute);
server.use(mainRoute);

server.use(moderatorRoute);
server.use(postRoute);
server.use(profileRoute);
server.use(eventRoute);
server.use(newsRoute);
server.use(helpRoute);
server.use(ebookRouter);
server.listen(PORT, () => {
  initDB.sequelize
    .authenticate()
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  console.log(`serrver is running on port ${PORT}`);
});
