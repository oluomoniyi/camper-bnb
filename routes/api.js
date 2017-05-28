var express = require("express")
var router = express.Router({mergeParams:true})
var Campground = require("../models/campground")

//GET ROUTE FOR USER SAVED CAMPGROUNDS
router.get("/api/campgrounds", function(req,res){
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err)
        }
        else{
            res.send(campgrounds);
        }
    })
})

module.exports = router