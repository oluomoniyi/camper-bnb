var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    firstname:String,
    surname:String,
    email:String,
    username:String,
    password: String
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)