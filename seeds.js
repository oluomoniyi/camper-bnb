var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name:"Clouds Rest", 
        image:"http://static2.businessinsider.com/image/542d7fbbecad044e5b9a74f6-1190-625/7-incredible-pictures-of-kids-turning-a-war-zone-into-a-playground.jpg",
        description:"Clouds Rest Locations",
        location:"Palestine"
    },
    {
        name:"Mountain View", 
        image:"http://www.lense.fr/wp-content/uploads/2014/10/gaza-parkour-3.jpg",
        description:"Clouds Rest Locations",
        location:"Longo"
    },
    {
        name:"Hill View", 
        image:"http://static4.businessinsider.com/image/542d7a6069bedddc31e84a68-800-/gaza-parkour.jpg",
        description:"Hill Rest Locations",
        location:"London"
    }
]

function seedDB (){
    //remove all grounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err)
        }
        console.log("removed")
        data.forEach(function(seed){//add
            Campground.create(seed, function(err,campground){
                if (err){
                    console.log(err)
                }
                else {
                    console.log("added new campground")
                     Comment.create(
                        {
                            text:"Comment",
                            author: "me"
                        }, function(err,comment){
                            if (err){
                                console.log(err)
                            }else {
                                campground.comments.push(comment)
                                campground.save();
                                console.log("new comment")
                            }
                    })
                }
            })
        })
    })
}

module.exports = seedDB