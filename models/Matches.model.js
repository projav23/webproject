const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
  center:{
    type: String,
    required: true,
    enum: []
  },
  level:{
    type: String,
    required: true,
    enum: ['principiante', 'medio', 'avanzado', 'profesional']
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
  }
})

module.exports = mongoose.model("Matches", MatchSchema)