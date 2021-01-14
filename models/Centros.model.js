const mongoose = require("mongoose")

const CenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  mapURL:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Centros", CenterSchema)