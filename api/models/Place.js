const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
  
    // for unique person unique places   so connect with user collection via ObjectId of user
owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
title:String,
address:String,
photos:[String],
description:String,
perks:[String],
extraInfo:String,
checkIn:Number,
checkOut:Number,
maxGuests:Number,
price:Number
})
      const PlaceModel = mongoose.model('Place',PlaceSchema)
      module.exports = PlaceModel
