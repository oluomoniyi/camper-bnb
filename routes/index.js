var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")

//INITIAL ROUTE
router.get("/", function (req,res){// GET ROUTE
   Campground.find({}, function(err, campgrounds){
   // Campground.find({}).populate("comments").exec(function(err, campgrounds){
        if (err){
            console.log(err)
        }
        else{
            res.render("campgrounds/index", {campgrounds})
            //res.send({campgrounds})
        }
    })
})

//SEARCH POST ROUTE
router.post("/search", function (req,res){ 
      var search = req.body.search;
	  if (search){
		res.redirect("/search?q="+search)
	  }
})

//SEARCH GET ROUTE
router.get("/search", function (req,res){
	var query = req.query["q"]
	if (query){//if search then search
        Campground.find({name: new RegExp(query, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/search", {campgrounds, query})
            }
        })
    }
})


function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router