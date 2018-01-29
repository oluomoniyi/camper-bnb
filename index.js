//INITIAL
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  request = require("request"),
  mongoose = require("mongoose"), //.set('debug', true),debugging is extremely useful in development
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Session = require("express-session"),
  seedDB = require("./seeds"),
  User = require("./models/user"),
  UserComment = require("./models/comment"),
  methodOverride = require("method-override"),
  port = process.env.PORT || 3000,
  url = process.env.DATABASEURL || "mongodb://localhost/mongo",
  secret = process.env.PASSPORT_SECRET || "UULUQdm2ktLsKN",
  commentRoutes = require("./routes/comments"),
  campgroundsRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index"),
  userRoutes = require("./routes/user"),
  api = require("./routes/api");

mongoose.connect(url);

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true })); //parse form data
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB();

//passport config
app.use(
  Session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport configuration

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use(campgroundsRoutes);
app.use(commentRoutes);
app.use(userRoutes);
app.use(api);

//catch all 404 error page
app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.listen(port, function() {
  console.log("Example app listening on port 3000!");
});
