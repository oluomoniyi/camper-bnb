var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var description = "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath"

var data = [
    {
        name:"Clouds Rest", 
        image:"http://static2.businessinsider.com/image/542d7fbbecad044e5b9a74f6-1190-625/7-incredible-pictures-of-kids-turning-a-war-zone-into-a-playground.jpg",
        description,
        location:"Palestine"
    },
    {
        name:"Mountain View", 
        image:"http://www.lense.fr/wp-content/uploads/2014/10/gaza-parkour-3.jpg",
        description,
        location:"Syria"
    },
    {
        name:"Hill View", 
        image:"http://static4.businessinsider.com/image/542d7a6069bedddc31e84a68-800-/gaza-parkour.jpg",
        description,
        location:"Lebanon"
    },
    {
        name:"Infinity Kingdom", 
        image:"https://i.ytimg.com/vi/JkXZ8tH-aDc/maxresdefault.jpg",
        description,
        location:"Lebanon"
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
                            text:"Perfect Location, very impressed",
                            author: "Olu",
                            campgroundId: campground._id
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