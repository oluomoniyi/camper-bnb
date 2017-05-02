var mongoose = require("mongoose")

//Scheme 
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String, 
    location: String,
    userid: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("Campground", campgroundSchema)