var express = require("express"), 
        app = express(),
        bodyParser = require("body-parser"),
        request = require("request"),
        mongoose = require("mongoose"),//.set('debug', true),debugging is extremely useful in development
        Campground = require("./models/campground"),
        seedDB = require("./seeds"),
        Comment = require("./models/comment"),
        //ObjectId = require('mongoose').Types.ObjectId,
        port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/mongo")
app.set("view engine", "ejs");
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended:true}));//parse form data
app.use(express.static(__dirname + "/public"))

//seedDB();

//INITIAL ROUTE
app.get("/", function (req,res){// GET ROUTE
    res.redirect("campgrounds")
})

//GET ROUTE
app.get("/campgrounds", function(req,res){
        Campground.find({}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/index", {campgrounds})
            }
        })
})

//SEARCH POST ROUTE
app.post("/search", function (req,res){ 
      var search = req.body.search;
	  if (search){
		res.redirect("/search?q="+search)
	  }
})

//SEARCH GET ROUTE
app.get("/search", function (req,res){
	var query = req.query["q"]
	if (query){//if search then search
        Campground.find({name: new RegExp(query, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                console.log(campgrounds.length)
                res.render("campgrounds/search", {campgrounds, query})
            }
        })
    }
})

//NEW ROUTE
app.get("/campgrounds/new", function (req,res){
    res.render("campgrounds/new");// template redirects user to the post route, to add new item
})

//CREATE ROUTE
app.post("/campgrounds", function (req,res){
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var location = req.body.location

	Campground.create({
		name,
		image,
		description,
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
app.get("/campgrounds/:id", function(req,res){
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err)
        }
        else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

//NEW COMMENT ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err){
            console.log(err)
        }else{
             res.render("comments/new", {campground})
        }
    })
})

//GET COMMENT ROUTE
app.get("/campgrounds/:id/comments", function(req, res) {
    var id = req.params.id;
    var ObjectId = require('mongodb').ObjectId; 
    var o_id = new ObjectId(id);
    Comment.find({"campgroundId": o_id},function(err, comments) {
        if (err){
            console.log(err)
        }else{
            console.log(comments)
            console.log(o_id, id)
            res.render("comments/show", {comments})
        }
    })
})

// CREATE COMMENT ROUTE
app.post("/campgrounds/:id/comments", function(req,res){
    var text = req.body.comment
    var author = req.body.author
    var campgroundId = req.params.id;
    Campground.findById(campgroundId, function (err, campground) {
        if (err){
            console.log(err)
        }else{
             Comment.create(
                {
                    text,
                    campgroundId,
                    author
                }, function(err,comment){
                    if (err){
                        console.log(err)
                    }else {
                        campground.comments.push(comment)
                        campground.save();
                        res.redirect("/campgrounds/" + campground._id)
                    }
            })
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(process.env.PORT, process.env.IP, "running")
});

// app.listen(port, function () {
//   console.log('Example app listening on port 3000!');
// })
