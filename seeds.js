var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var description = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath"

var data = [
    {
        name:"Clouds Rest", 
        image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Iowa, Canada"
    },
    {
        name:"Mountain View", 
        image:"https://images.unsplash.com/photo-1459378560864-f0b73495599c?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Chicago, USA"
    },
    {
        name:"Hill View", 
        image:"https://images.unsplash.com/photo-1470114888332-5bcd36dd1940?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Zaria, Nigeria"
    },
    {
        name:"Infinity Kingdom", 
        image:"https://images.unsplash.com/photo-1466220549276-aef9ce186540?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Lake District, UK"
    },
     {
        name:"Clouds Rest", 
        image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Iowa, Canada"
    },
    {
        name:"Mountain View", 
        image:"https://images.unsplash.com/photo-1459378560864-f0b73495599c?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Chicago, USA"
    },
    {
        name:"Hill View", 
        image:"https://images.unsplash.com/photo-1470114888332-5bcd36dd1940?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Zaria, Nigeria"
    },
    {
        name:"Infinity Kingdom", 
        image:"https://images.unsplash.com/photo-1466220549276-aef9ce186540?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Lake District, UK"
    },
     {
        name:"Clouds Rest", 
        image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Iowa, Canada"
    },
    {
        name:"Mountain View", 
        image:"https://images.unsplash.com/photo-1459378560864-f0b73495599c?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Chicago, USA"
    },
    {
        name:"Hill View", 
        image:"https://images.unsplash.com/photo-1470114888332-5bcd36dd1940?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Zaria, Nigeria"
    },
    {
        name:"Infinity Kingdom", 
        image:"https://images.unsplash.com/photo-1466220549276-aef9ce186540?dpr=1&auto=format&fit=crop&w=639&h=426&q=80&cs=tinysrgb&crop=&bg=",
        description,
        location:"Lake District, UK"
    }
]

function seedDB (){
    //remove all grounds
    // Campground.remove({}, function(err){
    //     if (err){
    //         console.log(err)
    //     }
    //     console.log("removed")
    //     data.forEach(function(seed){//add
    //         Campground.create(seed, function(err,campground){
    //             if (err){
    //                 console.log(err)
    //             }
    //             else {
    //                 console.log("added new campground")
    //                  Comment.create(
    //                     {
    //                         text:"Perfect Location, very impressed",
    //                         author: "Olu",
    //                         campgroundId: campground._id
    //                     }, 
    //                     function(err,comment){
    //                         if (err){
    //                             console.log(err)
    //                         }else {
    //                             campground.comments.push(comment)
    //                             campground.save();
    //                             console.log("new comment")
    //                         }
    //                 })
    //             }
    //         })
    //     })
    // })
    
    Campground.remove({}, function(err){
        if (err){
            console.log(err)
        } else {
        console.log("removed")
        }
    })
    Comment.remove({})
    data.forEach(function(seed){//add
        Campground.create(seed, function(err,campground){
            if (err){
                console.log(err)
            }
            else {
                campground.save();
            }
        })
    })
}

module.exports = seedDB