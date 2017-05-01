var express = require("express"), 
        app = express(),
        bodyParser = require("body-parser"),
        request = require("request"),
        mongoose = require("mongoose"),//.set('debug', true),debugging is extremely useful in development
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
        Campground = require("./models/campground"),
        seedDB = require("./seeds"),
        User = require("./models/user"),
        UserComment = require("./models/comment"),
        //ObjectId = require('mongoose').Types.ObjectId,

        port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/mongo")
app.set("view engine", "ejs");
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended:true}));//parse form data
app.use(express.static(__dirname + "/public"))

//seedDB();

//passport config
app.use(require("express-session")({
    secret: "UULUQdm2ktLsKNLhRYEz5Bff",
    resave: false,
    saveUninitialized:false
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

//INITIAL ROUTE
app.get("/", function (req,res){// GET ROUTE
    res.redirect("campgrounds")
})

//GET ROUTE
app.get("/campgrounds", function(req,res){
        Campground.find({}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/index", {campgrounds})
            }
        })
})

//SEARCH POST ROUTE
app.post("/search", function (req,res){ 
      var search = req.body.search;
	  if (search){
		res.redirect("/search?q="+search)
	  }
})

//SEARCH GET ROUTE
app.get("/search", function (req,res){
	var query = req.query["q"]
	if (query){//if search then search
        Campground.find({name: new RegExp(query, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                console.log(campgrounds.length)
                res.render("campgrounds/search", {campgrounds, query})
            }
        })
    }
})

//NEW ROUTE
app.get("/campgrounds/new", isLoggedIn, function (req,res){
    res.render("campgrounds/new");// template redirects user to the post route, to add new item
})

//CREATE ROUTE
app.post("/campgrounds", isLoggedIn, function (req,res){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var location = req.body.location

	Campground.create({
		name,
		image,
		description,
		location
		}, function (err, campground){
		if (err){
			console.log(err)
		}
		else{
			console.log(campground)
		}
	})
	res.redirect("/")
})

//SHOW route
app.get("/campgrounds/:id", function(req,res){
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err)
        }
        else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

//NEW COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err){
            console.log(err)
        }else{
             res.render("comments/new", {campground})
        }
    })
})

//GET COMMENT ROUTE
app.get("/campgrounds/:id/comments", function(req, res) {
    var id = req.params.id;
    var ObjectId = require('mongodb').ObjectId; 
    var o_id = new ObjectId(id);
    UserComment.find({"campgroundId": o_id},function(err, comments) {
        if (err){
            console.log(err)
        } else{
            console.log(comments)
            console.log(o_id, id)
            res.render("comments/show", {comments})
        }
    })
})

// CREATE COMMENT ROUTE
app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
    var text = req.body.comment
    var author = req.body.author
    var campgroundId = req.params.id;
    Campground.findById(campgroundId, function (err, campground) {
        if (err){
            console.log(err)
        }
        else{
            UserComment.create(
            {
                text,
                campgroundId,
                author
            }, function(err,comment){
                if (err){
                    console.log(err)
                }else {
                    campground.comments.push(comment)
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

//AUTH ROUTES
app.get("/register", function(req,res){
    res.render("register")
})

//SignUp
app.post("/register", function(req,res){
    var username = req.body.username
    var password = req.body.password
    var newUser = new User({username})
    var firstname = req.body.firstname
    var surname = req.body.surname
    var email = req.body.email

    // User.create({
    //     firstname,
    //     surname,
    //     email
    // }), 
    User.register(newUser, password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register")
        } else  {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/")
            })
        }
    })
})

//show login form
app.get("/login", function(req,res){
    res.render("login")
})

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/", 
        failureRedirect:"/login"
    }), function(req,res){
})

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/")
})

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

//AUTH ROUTES END

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(process.env.PORT, process.env.IP, "running")
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// })