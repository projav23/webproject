const mongoose = require("mongoose")

const centro = new mongoose.Schema({
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
  }
})