const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    userName:{
        type:String
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"roles"
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    }

})

module.exports = mongoose.model("users",userSchema)