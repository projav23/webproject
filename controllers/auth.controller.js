const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const moment = require('moment')



//Errores de validacion mongoose
const isMongooseErrorValidation =  (error) =>
  error instanceof mongoose.Error.ValidationError;
//Error de duplicado MongoDB
const isMongoError = ({code: errorCode}) => errorCode === 11000;
//Formato de la contrasenya
const hasCorrectPasswordFormat = (password) => {
  const passRegEx = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
  return passRegEx.test(password);
}
//Mostrar el formulario de registro
const showFormSignup = async (req,res,next) => {
  res.render('signup')
}
//Mostrar el formulario de login
const showFormLogin = async (req,res,next) => {
  res.render('login')
}
//Mostrar el formulario crear partido
const showFormMatch = async (req,res,next) => {
  const createdBy = req.session.currentUser.username
  res.render('newgame', {createdBy})
}
//Mostrar listado de partidos
const showAllMatches = async (req,res, next) => {
  try{
    const match = await Matches.find()
    console.log(match)
    res.render('list', {match})
  } catch(e){
    console.error(e)
  }
}
//Asegurar que el usuario esta logeado para acceder a privadas
const userLogin = async (req,res,next) => {
  if(req.session.currentUser){
    return next()
  }
  res.render('login')
}
//POST SIGNUP
const signup = async (req,res,next) =>{
  try{
    const {name, lastname, age, country, level, favoriteClub, esports, username, email, password} = req.body;
    const isMissingCredentials = !email || !country || !password || !name || !lastname || !age || !username || !level || !esports
    if(isMissingCredentials){
      res.render('signup', {message: "Missing fields"})
    }
    if(!hasCorrectPasswordFormat){
      res.render('signup', {message: "Invalid password format"})
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedpassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
      name,
      lastname,
      age, 
      country,
      favoriteClub,
      level,
      esports,
      email,
      username,
      passwordHash: hashedpassword
    })
    console.log(user)
    res.send("usuario creado")
  }catch(e){
    //Mostrar el error de duplicado
    if(isMongoError(e)){
      console.error(e)
      res.render('signup', {message: 'El usuario ya existe.'})
    }
    //Mostrar el error de validacion
    if(isMongooseErrorValidation(e)){
      console.error(e)
      res.render('signup', {message: 'Failed validation'})
    }
  }
}
//POST LOGIN
const login = async (req,res,next) => {
  try{
    const {email, password} = req.body
    const isMissingCredentials = !email || !password;
    if(isMissingCredentials){
      res.render('signup', {message: "Missing credentials"})
    }
    const {passwordHash,...user} = await Users.findOne({email}).lean()
    if(!user){
      res.render('signup', {message: "User does not exist. Please signup."})
    }
    req.session.currentUser = user

    return res.render('index', user)
  }catch(e){
    console.error(e)
  }
}
//POST MATCH
const createMatch = async (req,res,next) => {
  try{
    const {center, date, numberPlayers, level, esport, location, createdBy} = req.body;
    const isMissingCredentials = !center || !date || !numberPlayers || !level || !esport || !location
    if(isMissingCredentials){
      res.render('newgame', {message: "Debes rellenar todos los campos."})
    }
    const newmatch = await Matches.create({
      center,
      level,
      location,
      esport,
      numberPlayers,
      date,
      createdBy
    })
    res.render('index')
    console.log(newmatch)
  } catch(e){
    console.error(e)
  }
}

module.exports = {showFormLogin, showFormSignup, login, signup, showFormMatch, createMatch, showAllMatches, userLogin}