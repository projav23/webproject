const mongoose = require('mongoose')


const emailRegex = /^\S+@\S+\.\S+$/;
const arrayImg = ["/images/shwartzman.png","/images/berretini.png","/images/barty.png","/images/bouchard.png","/images/player.png","/images/rublev.png","/images/zverez.png","/images/tsitsipas.png","/images/federer.png","/images/thiem.png","/images/medvedev.png","/images/kirilenko.png","/images/sharapova.png","/images/nadal.png","/images/djokovic.png",]
function randomImg(array){
  const i = Math.floor(Math.random() * array.length);
  return array[i]
}
//Modelo de usuarios
const UserSchema = new mongoose.Schema({
  img:{
    type:String
  },
  name:{
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true 
  },
  age:{
    type: Number,
    min: 18,
    max: 65,
    required: true
  },
  country:{
    type: String,
    default: "Spain"
  },
  comunidad:{
    type: mongoose.Schema.Types.ObjectId, ref: "Comunidades"
  },
  imgURL: {
    type: String,
    default: randomImg(arrayImg)
  },
  level:{
    type: String,
    enum: ['Principiante', 'Medio', 'Avanzado', 'Profesional'],
  },
  username:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [emailRegex, "Please use a valid email address"],
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true,
    trim: true
  },
  hostedEvents:[{
    type: mongoose.Schema.Types.ObjectId, ref: "Matches"
  }],
  pendingEvents: [{  
    type: mongoose.Schema.Types.ObjectId, ref: "Matches"
  }],
  attendedEvents: [{  
    type: mongoose.Schema.Types.ObjectId, ref: "Matches"
  }],
  scoreTenisInd: {
    type: Number,
    default: 0
  },
  scoreTenisDob: {
    type: Number,
    default: 0
  },
  scorePadelInd: {
    type: Number,
    default: 0
  },
  scorePadelDob: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model("Users", UserSchema)