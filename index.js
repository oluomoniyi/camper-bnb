var express = require("express"), 
        app = express(),
        bodyParser = require("body-parser"),
        request = require("request"),
        mongoose = require("mongoose"),//.set('debug', true),debugging is extremely useful in development
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
        Session = require("express-session"),
        seedDB = require("./seeds"),
        User = require("./models/user"),
        UserComment = require("./models/comment"),
        methodOverride = require("method-override"),
        //ObjectId = require('mongoose').Types.ObjectId,
        port = process.env.PORT || 3000;
        
var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/user")
  

mongoose.connect("mongodb://localhost/mongo")
app.set("view engine", "ejs");
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended:true}));//parse form data
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))

//seedDB();

//passport config
app.use(Session({
    secret: "UULUQdm2ktLsKNLhRYEz5Bff",
    resave: false,
    saveUninitialized:false,
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//passport configuration

app.use(function(req,res,next){
    res.locals.currentUser = req.user
    next();
})

app.use(indexRoutes)
app.use(campgroundsRoutes)
app.use(commentRoutes);
app.use(userRoutes)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(process.env.PORT, process.env.IP, "running")
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// })
