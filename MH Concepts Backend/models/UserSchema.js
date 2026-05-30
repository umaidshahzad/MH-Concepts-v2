const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["Admin","User"],default:"User"}
})

module.exports = mongoose.model("User", UserSchema);