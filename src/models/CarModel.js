const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema=new Schema({

companyName:{
    type:String,
    required: true
},
model:{
    type:String,
    required: true
    


},
year:{
    type:Number,
    required:true
},
price:{
    type:Number,
    required:true
},
fuelType:{
    enum:["Petrol","Diesel","Electric","Hybrid"],
    type:String,
    required:true
},
transmissionType:{
    enum:["Manual","Automatic","Semi-Automatic"],
    type:String,
    required:true
},
mileage:{
    type:Number
},
description:{
    type:String
},
stateId:{
    type: Schema.Types.ObjectId,
    ref: 'State',
    required: true
},
cityId:{
    type: Schema.Types.ObjectId,
    ref: 'City',
    required: true
},
areaId:{
    type: Schema.Types.ObjectId,
    ref: 'Area',
    required: true
},
userId:{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
},
carURL:{
    type: String,
    require: true
}


},{timestamps: true});
module.exports=mongoose.model('car',carSchema);