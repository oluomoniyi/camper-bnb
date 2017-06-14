var express = require("express")
var router = express.Router({mergeParams:true})
var Campground = require("../models/campground")

//GET ROUTE FOR USER SAVED CAMPGROUNDS
router.get("/api/search", function (req,res){
	var query = req.query["q"]
	if (query){//if search then search
        Campground.find({location: new RegExp(query, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.send({campgrounds, query})
            }
        })
    }
    else {
        Campground.find({}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.send({campgrounds})
            }
        })
    }
})

router.get("/api/searchById", function (req,res){
    Campground.findById(req.query["id"], function(err, campgrounds){
        if (err){
            console.log(err)
        }
        else{
            res.send({campgrounds})
        }
    })
})

module.exports = router