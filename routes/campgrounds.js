var express = require("express")
var router = express.Router({mergeParams:true})
var Campground = require("../models/campground")
var UserComment = require("../models/comment")
var middleware = require("../middleware")
var messages = require("../middleware/globalvar")

//GET ROUTE FOR USER SAVED CAMPGROUNDS
router.get("/campgrounds", middleware.isLoggedIn, function(req,res){
    var userid = req.user._id
    Campground.find({"user.id":req.user._id}, function(err, campgrounds){
        if (err){
            console.log(err)
        }
        else{
            res.render("campgrounds/campgrounds", {campgrounds, query:"/campgrounds"})
        }
    })
})

//CREATE ROUTE
router.post("/campgrounds", middleware.isLoggedIn, function (req,res){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var location = req.body.location

	Campground.create({
		name,
		image,
		description,
		price: req.body.price,
        user : {
            id: req.user._id
        },
		location
		}, function (err, campground){
		if (err){
			console.log(err)
			req.flash("error", messages.errorFound);
			res.redirect("/campgrounds")
		}
		else{
		    req.flash("success", name + " " + messages.campgroundCreated);
		    res.redirect("/campgrounds")
			//console.log(campground)
		}
	})
})

//NEW ROUTE
router.get("/campgrounds/new", middleware.isLoggedIn, function (req,res){ //this has to be before :id if not it will throw an error (CastError) when it tries to find with ID new
   res.render("campgrounds/new");// template redirects user to the post route, to add new item
})

//SHOW ROUTE
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

//BOOK CAMPGRROUND
router.get("/campgrounds/:id/book", middleware.isLoggedIn, function(req,res){
    req.flash("success", messages.campgroundBooked);
    res.redirect("/campgrounds/" + req.params.id)
    
//     Campground.findByIdAndUpdate(req.params.id, function(err, campground){
// 		if (err){
// 		    console.log(err)
// 		    res.redirect("/")
// 		}else {
// 		    res.send("this campground is now booked logic")
// 		}
// 	})
})


//EDIT ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function (req,res){
    Campground.findById(req.params.id, function(err, campgrounds){
        if (err){
            req.flash("error", messages.errorFound);
		    res.redirect("/campgrounds/" + req.params.id)
		}
        res.render("campgrounds/edit", {campgrounds})
    })
})

//UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if (err){
		    console.log(err)
		    req.flash("error", messages.errorFound);
		    res.redirect("/")
		}else {
		    req.flash("success", messages.campgroundSaved);
		    res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", messages.errorFound);
          res.redirect("/campgrounds");
      } else {
          req.flash("success", messages.campgroundDestroyed);
          res.redirect("/campgrounds");
      }
  });
});

module.exports = router