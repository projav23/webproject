const mongoose = require("mongoose")

const ComunidadesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imgURL: {
    type: String
  }
})

module.exports = mongoose.model("Comunidades", ComunidadesSchema)