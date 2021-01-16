require("dotenv").config();
const mongoose = require("mongoose");
const data = require("./data")
const Centros = require("../models/Centros.model")

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function initDb(){
  try{
    const connect = await mongoose.connect(process.env.MONGODB_URI, dbOptions);
    console.log("connect",connect)
    const centers = await Centros.create(data);
    console.log("centros",centers)
    mongoose.connection.close();
  }catch(e){
    console.error(e)
  }
};

initDb();