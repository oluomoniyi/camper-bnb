var express = require("express"), 
        app = express(),
        bodyParser = require("body-parser"),
        request = require("request"),
        mongoose = require("mongoose"),
        Campground = require("./models/campground"),
        seedDB = require("./seeds"),
        port = process.env.PORT || 3000;

seedDB();
mongoose.connect("mongodb://localhost/yelpcamp")
app.set("view engine", "ejs");
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended:true}));//parse form data


app.get("/", function (req,res){// intial route
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

app.get("/campgrounds/new", function (req,res){
    res.render("new");// template redirects user to the post route, to add new item
})

app.get("/campgrounds", function(req,res){//index and search route
    //console.log(req.query['name'])
    var search = req.query['name'];
    if (search){//if search then search
        Campground.find({name: new RegExp(search, 'i')}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                if (campgrounds){
                    res.render("index", {campgrounds, search})
                }
                else {
                    res.render("index", {campgrounds, search})
                }
            }
        })
    } else {
        Campground.find({}, function(err, campgrounds){
            if (err){
                console.log(err)
            }
            else{
                res.render("index", {campgrounds, search})
            }
        })
    }
})

app.get("/campgrounds/:id", function(req,res){//show route
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err)
        }
        else {
            console.log(foundCampground)
            res.render("show", {campground: foundCampground})
        }
    })
})

app.post("/campgrounds", function (req,res){//Create route
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
                console.log("new camp")
                console.log(campground)
            }
        })
        res.redirect("/")
    } 
})

// app.listen(port, function () {
//   console.log('Example app listening on port 3000!');
// })

app.listen(process.env.PORT, process.env.IP);