var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var UserComment = require("../models/comment");
var mongoose = mongoose = require("mongoose");
var middleware = require("../middleware");
var messages = require("../middleware/globalvar")

//NEW COMMENT ROUTE
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err){
            console.log(err)
        }else{
             res.render("comments/new", {campground})
        }
    })
})

//GET COMMENTS SHOW ROUTE 
router.get("/campgrounds/:id/comments", function(req, res) {
    var id = req.params.id;
    var ObjectId = require('mongodb').ObjectId; 
    var o_id = new ObjectId(id);
    var check = "CampComment"
    UserComment.find({"campgroundId": o_id},function(err, comments) {
        if (err){
            console.log(err)
        } else{
            //console.log(comments)
            //console.log(o_id, id)
            res.render("comments/show", {comments, check})
        }
    })
})

//GET REVIEWS SHOW ROUTE FOR USER
router.get("/comments", middleware.isLoggedIn, function(req, res) {
    var id = req.user._id;
    var ObjectId = require('mongodb').ObjectId; 
    var o_id = new ObjectId(id);
    var check = "UserComment"
    UserComment.find({"author.id": o_id},function(err, comments) {
        if (err){
            console.log(err)
        } else{
            //console.log(comments)
            //console.log(o_id, id)
            res.render("comments/show", {comments, check})
        }
    })
})

//EDIT REVIEWS SHOW ROUTE FOR USER
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    // var id = req.user._id;
    // var ObjectId = require('mongodb').ObjectId; 
    // var o_id = new ObjectId(id);
    // var check = "UserComment"
    UserComment.findById(req.params.comment_id,function(err, comment) {
        if (err){
            console.log(err)
        } else{
            res.render("comments/edit", {comment})
        }
    })
})

//UPDATE REVIEW
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    UserComment.findByIdAndUpdate(req.params.comment_id, req.body.text, function(err, comment) {
        if (err){
            console.log(err)
            res.redirect("back")
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// CREATE COMMENT ROUTE
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
    var text = req.body.comment
    var campgroundId = req.params.id;
    Campground.findById(campgroundId, function (err, campground) {
        if (err){
            console.log(err)
        }
        else{
            UserComment.create(
            {
                text,
                campground : {
                    id : campground._id,
                    name: campground.name,
                    image: campground.image
                },
                author: {
                    id: req.user._id,
                    username: req.user.username
                }
                
            }, function(err,comment){
                if (err){
                    console.log(err)
                    req.flash("error", messages.errorFound);
                }else {
                    campground.comments.push(comment)
                    campground.save();
                    req.flash("success", messages.commentSaved);
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
})

module.exports = router;