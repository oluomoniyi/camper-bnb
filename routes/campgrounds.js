var express = require("express")
var router = express.Router({mergeParams:true})
var Campground = require("../models/campground")
var UserComment = require("../models/comment")
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}
//GET ROUTE
router.get("/campgrounds", function(req,res){
    var userid = req.user._id
    Campground.find({userid}, function(err, campgrounds){
        if (err){
            console.log(err)
        }
        else{
            res.render("campgrounds/campgrounds", {campgrounds})
        }
    })
})

//NEW ROUTE
router.get("/campgrounds/new", isLoggedIn, function (req,res){
    res.render("campgrounds/new");// template redirects user to the post route, to add new item
})

//EDIT ROUTES
router.get("/campgrounds/:id/edit", function (req,res){
    console.log(req.user, req.params.id)
    //var userid = req.user._id
    //if (req.params.id == userid){ 
    if (1==1){
        Campground.findById(req.params.id, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/edit", {campgrounds})
                console.log(campgrounds)
            }
        })
    }
    else {
        res.send("access denied")
   }
})

//Update
router.post("/campgrounds/:id/update", function(res,req){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var location = req.body.location
    var campgroundId = req.params.id

	Campground.update({_id: campgroundId}, {'$set': {
		name,
		image,
		description,
		location
		}}, function (err, campground){
		if (err){
			console.log(err)
		}
		else{
			console.log(campground)
		}
	})
	res.redirect("/campgrounds"+campgroundId)
})
//EDIT ROUTES

//CREATE ROUTE
router.post("/campgrounds", isLoggedIn, function (req,res){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var location = req.body.location
    var userid = req.user._id

	Campground.create({
		name,
		image,
		description,
        userid,
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
router.get("/campgrounds/:id", function(req,res){
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function(err, campground){
        if (err){
            console.log(err)
        }
        else {
            res.render("campgrounds/show", {campground})
        }
    })
})

module.exports = router