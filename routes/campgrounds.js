var express = require("express")
var router = express.Router({mergeParams:true})
var Campground = require("../models/campground")
var UserComment = require("../models/comment")

//GET ROUTE FOR USER SAVED CAMPGROUNDS
router.get("/campgrounds", isLoggedIn, function(req,res){
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
router.post("/campgrounds", isLoggedIn, function (req,res){
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
		}
		else{
			//console.log(campground)
		}
	})
	res.redirect("/campgrounds")
})

//NEW ROUTE
router.get("/campgrounds/new", isLoggedIn,function (req,res){ //this has to be before :id if not it will throw an error (CastError) when it tries to find with ID new
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
router.get("/campgrounds/:id/book", function(req,res){
    Campground.findByIdAndUpdate(req.params.id, function(err, campground){
		if (err){
		    console.log(err)
		    res.redirect("/")
		}else {
		    res.redirect("/campgrounds/" + req.params.id)
		}
	})
})


//EDIT ROUTE
router.get("/campgrounds/:id/edit", CheckOwnership, function (req,res){
    Campground.findById(req.params.id, function(err, campgrounds){
         res.render("campgrounds/edit", {campgrounds})
    })
})

//UPDATE ROUTE
router.put("/campgrounds/:id", CheckOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if (err){
		    console.log(err)
		    res.redirect("/")
		}else {
		    res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", CheckOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
  });
});


function CheckOwnership(req,res,next){
     if (req.isAuthenticated()){ 
        Campground.findById(req.params.id, function(err, campgrounds){
            if (err){
                res.redirect("back")
            }
            else{
                if (campgrounds.user.id && campgrounds.user.id.equals(req.user._id)){//check if user.id exists first
                    next()
                }
                else {
                    res.redirect("back")
                }
            }
        })
    }
    else {
        res.redirect("back")
    }
}

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router