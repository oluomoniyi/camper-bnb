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
router.get("/campgrounds", isLoggedIn, function(req,res){
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
			//console.log(campground)
		}
	})
	res.redirect("/campgrounds")
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


//NEW ROUTE
router.get("/campgrounds/new", isLoggedIn, function (req,res){
    res.render("campgrounds/new");// template redirects user to the post route, to add new item
})

//EDIT ROUTES
router.get("/campgrounds/:id/edit", isLoggedIn, function (req,res){
    console.log(req.user, req.params.id)
    //var userid = req.user._id
    //if (req.params.id == userid){ 
    if (1==1){
        Campground.findById(req.params.id, function(err, campgrounds){
            if (err){
                console.log(err)
                res.redirect("campgrounds")
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
router.put("/campgrounds/:id", isLoggedIn, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
	    console.log("CAMPGROUND HERE",campground)
		if (err){
		    console.log(err)
		    res.redirect("/")
		}else {
		    res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
  });
});


module.exports = router