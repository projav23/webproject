const mongoose = require("mongoose")
const express = require('express')
require('dotenv').config() 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs')
const path = require('path');
const connectSession = require("./config/session.config");
const app = express()

//database configuration required
require('./config/db.config')
connectSession(app)

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//Views 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//Routas
const index = require('./routes/index.routes')
const login = require('./routes/login.routes')
const signup = require('./routes/signup.routes')
const matches = require('./routes/matches.routes')
app.use('/', index)
app.use('/auth', login)
app.use('/auth', signup)
app.use('/matches', matches)


//Puerto de escucha
app.listen(process.env.PORT, ()=>console.log("Esta corriendo en el puerto 4000"))

