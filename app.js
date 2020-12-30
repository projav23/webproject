const mongoose = require("mongoose")
const express = require('express')
require('dotenv').config() 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs')
const helpers = require("handlebars-helpers")
const path = require('path');
const connectSession = require("./config/session.config");
const app = express()


//database configuration required
require('./config/db.config')
connectSession(app)

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//date format
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
//array helper
const array = helpers.array()
//Route partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//Views 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



// matches-logic


// develop
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

//Routas
const index = require('./routes/index.routes')
const login = require('./routes/login.routes')
// const signup = require('./routes/signup.routes')
const matches = require('./routes/matches.routes')
const logout = require("./routes/logout.routes")
const requests = require('./routes/solicitudes.routes')
app.use('/', index)
app.use('/', login)
// app.use('/', signup)
app.use('/matches', matches)
app.use('/solicitudes', requests)
app.use("/logout", logout)

//Puerto de escucha
app.listen(process.env.PORT, ()=>console.log("Esta corriendo en el puerto 4000"))

