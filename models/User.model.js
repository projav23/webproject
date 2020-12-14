const mongoose = require('mongoose')


const emailRegex = /^\S+@\S+\.\S+$/;

//Modelo de usuarios
const UserSchema = new mongoose.Schema({
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
  level:{
    type: String,
    enum: ['Principiante', 'Medio', 'Avanzado', 'Profesional'],
    required: true
  },
  favoriteClub:{
    type: String,
    enum: [],
    required: false
  },
  esports:{
    type: String,
    enum: ["Padel", "Tenis"],
    required: true
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
  }
})

module.exports = mongoose.model("Users", UserSchema)