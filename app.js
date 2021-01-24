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

//array helper
// const array = helpers.array()

//database configuration required
require('./config/db.config')
connectSession(app)

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//date format
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
//logical compare helpers
hbs.registerHelper('ifCond', function(v1, v2, options) {
  return v1 != v2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('ifeq', function(v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('ifeq1', function(v1, v2, options) {
  return v1 !== v2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
hbs.registerHelper('ifIn', function(elem, list, options) {
  if(list.indexOf(elem) > -1) {
    return options.fn(this);
  }
  return options.inverse(this);
});


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
const auth = require('./routes/login.routes')
const matches = require('./routes/matches.routes')
const logout = require("./routes/logout.routes")
// const requests = require('./routes/solicitudes.routes')
const profile = require("./routes/profile.routes")
const ranking = require('./routes/ranking.routes')
app.use('/', index)
app.use('/auth', auth)
app.use('/matches', matches)
// app.use('/solicitudes', requests)
app.use("/logout", logout)
app.use("/profile", profile)
app.use("/ranking", ranking)

//Puerto de escucha
app.listen(process.env.PORT, ()=>console.log("Esta corriendo en el puerto 3000"))

