var mongoose = require("mongoose");
var Campgrond = require("./models/campground")
var Comment = require("./models/comments")

var data = [
    {
        name:"Clouds Rest", 
        image:"https://unsplash.com/?photo=ixHfyjA49M8",
        description:"Clouds Rest Locations",
        location:"Lagos"
    },
    {
        name:"Mountain View", 
        image:"https://unsplash.com/?photo=DgEA7saT8FQ",
        description:"Clouds Rest Locations",
        location:"Longo"
    },
    {
        name:"Hill View", 
        image:"https://unsplash.com/?photo=UO02gAW3c0c",
        description:"Hill Rest Locations",
        location:"London"
    }
]

function seedDB (){
    //remove all grounds
    Campgrond.remove({}, function(err){
        if (err){
            console.log(err)
        }
        console.log("removed")
        //add
        data.forEach(function(seed){
            Campgrond.create(seed, function(err,campground){
                if (err){
                    console.log(err)
                }
                else {
                    console.log("added new campground")
                }
            })
                //     Comment.create(
                //         {
                //         text:"Comment",
                //         author: "me"
                //         }, function(err,cmt){

                //         })
                //     )
                // }
        })
    })
}

module.exports = seedDB