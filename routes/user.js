var express = require("express")
var router = express.Router({mergeParams:true})
var passport = require("passport")
var LocalStrategy = require("passport-local")
var Session = require("express-session")
var Campground = require("../models/campground")
var User = require("../models/user")

//users routes
router.get("/users/edit", function(req,res){
    res.render("loginEdit")
})

router.post("users/update/:id", function(req,res){
    var userid = req.params.id
    var username = req.session.passport.user
    var newPass = req.body.password
    console.log(username, userid)
    User.findByUsername(username).then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(newPass, function(){
            sanitizedUser.save();
            res.send('password reset successful');
        });
    } else {
        res.send('user does not exist');
    }
    },function(err){
        console.error(err);
    })
})

//AUTH ROUTES
router.get("/register", function(req,res){
    res.render("register")
})

//SignUp
router.post("/register", function(req,res){
    var username = req.body.username
    var password = req.body.password
    var newUser = new User({username})
    var firstname = req.body.firstname
    var surname = req.body.surname
    var email = req.body.email

    User.register(newUser, password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register")
        } else  {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/")
            })
        }
    }), User.create({
        firstname,
        surname,
        email
    })
})

//show login form
router.get("/login", function(req,res){
    res.render("login")
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/", 
        failureRedirect:"/login"
    }), function(req,res){
})

router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/")
})

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router