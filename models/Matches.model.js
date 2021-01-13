const mongoose = require('mongoose')


const MatchSchema = new mongoose.Schema({
  center:{
    type: mongoose.Schema.Types.ObjectId, ref: "Centros",
    required: true,
  },
  level:{
    type: String,
    required: true,
    enum: ['Principiante', 'Medio', 'Avanzado', 'Profesional']
  },
  numberPlayers:{
    type: Number,
    enum: [2,4],
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
    enum: ['Cerrado', 'Abierto', 'Finalizado'],
    default: 'Abierto'
  }
})

module.exports = mongoose.model("Matches", MatchSchema)