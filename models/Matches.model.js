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
    max: 4,
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
  },
  host: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users", 
    required: true
  },
  acceptedGuests: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Users"
  }],
  pendingGuests: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Users"
  }],
  status: {
    type: String,
    enum: ['Cerrado', 'Abierto'],
    default: 'Abierto'
  }
})

module.exports = mongoose.model("Matches", MatchSchema)