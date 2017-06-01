var express = require("express")
var router = express.Router({mergeParams:true})
var passport = require("passport")
var LocalStrategy = require("passport-local")
var Session = require("express-session")
var Campground = require("../models/campground")
var User = require("../models/user")
var middleware = require("../middleware");
var messages = require("../middleware/globalvar")

// //users routes
// router.get("/users", isLoggedIn, function(req,res){
//     res.render("userEdit")
// })

router.get("/users/:id/edit", middleware.isLoggedIn, function(req,res){
    User.findById(req.params.id, function (err,user) {
        if (err){
    	    console.log(err)
    	}else {
            //console.log(user)
            res.render("userEdit", {user})
    	}
    })
})

router.get("/users/:id/reset_password", middleware.isLoggedIn, function(req,res){
   res.render("loginEdit")
})

//update
router.put("/users/:id", middleware.isLoggedIn, function(req,res){
    var username = req.session.passport.user
    var newPass = req.body.password
    
	User.findByIdAndUpdate(req.params.id, req.body.user, function(err, user){
    	if (err){
    	    console.log(err)
    	    req.flash("error", messages.errorFound);
    	    req.redirect("/")
    	}else {
            //console.log(user)
            req.flash("success", messages.userSaved);
            res.redirect("/users/" + req.params.id + "/edit")
    	}
    })
})

//password reset
router.put("/users/:id/reset_password", middleware.isLoggedIn, function(req,res){
    var username = req.session.passport.user
    var newPass = req.body.password
    User.findByUsername(username).then(function(sanitizedUser) {
        if (sanitizedUser) {
            sanitizedUser.setPassword(newPass, function() {
                sanitizedUser.save();
                req.flash("success", messages.userPassUpdated);
                res.redirect('/')
            });
        } else {//failed
            req.flash("error", messages.userNull);
            res.redirect('/');
        }
    }, function(err) {
        console.error(err);
    })
})

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
            req.flash("error", err);
            return res.render("register")
        } else  {
            passport.authenticate("local")(req,res, function(){
                req.flash("success", messages.userWelcome + " " + user.username);
                res.redirect("/")
            })
        }
    })
    //, User.create({
    //     firstname,
    //     surname,
    //     email
    // })
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
    req.flash("success", messages.userLoggedOut);
    res.redirect("/")
})

module.exports = router