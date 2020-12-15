const mongoose = require('mongoose')


const MatchSchema = new mongoose.Schema({
  center:{
    type: String,
    required: true,
    enum: ['Artos', 'Club Tenis La Salut']
  },
  level:{
    type: String,
    required: true,
    enum: ['Principiante', 'Medio', 'Avanzado', 'Profesional']
  },
  numberPlayers:{
    type: Number,
    min: 1,
    max: 3,
    required: true
  },
  location:{
    type: String,
    required: true,
    enum: []
  },
  esport:{
    type: String,
    required: true,
    enum: ["Padel", "Tenis"]
  },
  date: {
    type: Date,
    required: true
  }
  
})

module.exports = mongoose.model("Matches", MatchSchema)