var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text:String,
    author: String,
    campgroundId:String
})

module.exports = mongoose.model("Comment", commentSchema)