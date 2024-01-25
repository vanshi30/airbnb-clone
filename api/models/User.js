const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
name: {
    type:String,
    required:[true,"name is required"],
    minlength:[3,"min 3 characters needed"],
    maxlength:[30,"no more than 30 characters allowed"]
},
email:{
    type:String,
    required:[true,"email is required"],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Enter proper email"],
    unique:true},
password:{
    type:String,
    required:[true,"password needed"]
}
})

const UserModel = mongoose.model("User",UserSchema)

module.exports = UserModel