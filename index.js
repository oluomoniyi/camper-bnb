var express = require("express"), 
        app = express(),
        bodyParser = require("body-parser"),
        request = require("request"),
        mongoose = require("mongoose"),
        Campground = require("./models/campground"),
        seedDB = require("./seeds"),
        Comment = require("./models/comment"),
        ObjectId = require('mongoose').Types.ObjectId,
        port = process.env.PORT || 3000;

//seedDB();
mongoose.connect("mongodb://localhost/mongo")
app.set("view engine", "ejs");
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended:true}));//parse form data


app.get("/", function (req,res){// GET ROUTE
    res.redirect("campgrounds")
//    Campground.find({}, function(err, campgrounds){
//         if (err){
//             console.log(err)
//         }
//         else{
//             res.redirect(campgrounds, {campgrounds})
//         }
//     })
})

app.get("/campgrounds", function(req,res){// GET ROUTE AND SEARCH ROUTE
    //console.log(req.query['name'])
    var search = req.query['name'];
    if (search){//if search then search
        Campground.find({name: new RegExp(search, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                if (campgrounds){
                    res.render("campgrounds/index", {campgrounds, search})
                }
                else {
                    res.render("campgrounds/index", {campgrounds, search})
                }
            }
        })
    } else {
        Campground.find({}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("campgrounds/index", {campgrounds, search})
            }
        })
    }
})

app.get("/campgrounds/new", function (req,res){// NEW ROUTE
    res.render("campgrounds/new");// template redirects user to the post route, to add new item
})

app.post("/campgrounds", function (req,res){//CREATE ROUTE
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var location = req.body.location

    var search = req.body.search;
    if (!name){
        res.redirect("/campgrounds?name="+search)
    }
    else{
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
    } 
})

app.get("/campgrounds/:id", function(req,res){//SHOW route
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

// app.listen(port, function () {
//   console.log('Example app listening on port 3000!');
// })


app.get("/campgrounds/:id/comments/new", function(req, res) {//NEW ROUTE
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err){
            console.log(err)
        }else{
             res.render("comments/new", {campground})
             console.log("Real test",campground)
        }
    })
})

app.get("/campgrounds/:id/comments", function(req, res) {//GET COMMENT ROUTE
    var id = req.params.id;
    //query = { campaign_id: new ObjectId(campaign._id) }
    Comment.find({_id:new ObjectId(id)},function(err, comments) {
        if (err){
            console.log(err)
        }else{
            console.log(comments)
            console.log(id)
            res.render("comments/show", {comments})
        }
    })
})

app.post("/campgrounds/:id/comments", function(req,res){// CREATE COMMENT ROUTE
    var text = req.body.comment
    var author = req.body.author
    var id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err){
            console.log(err)
        }else{
             Comment.create(
                {
                    text,
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