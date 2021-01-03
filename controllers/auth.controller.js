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
//Asegurar que el usuario esta logeado para acceder a privadas
const userLogin = async (req,res,next) => {
  if(req.session.currentUser){
    return next()
  }
  res.redirect('/')
}
//POST LOGIN
const login = async (req,res,next) => {
  try{
    if(Object.keys(req.body).length > 3){
      return next()
    
    }else {
      const {email, password} = req.body
      const isMissingCredentials = !email || !password;
      if(isMissingCredentials){
        res.render('index', {message: "Missing credentials"})
      }
      const {passwordHash,...user} = await Users.findOne({email}).lean()
      if(!user){
        res.render('index', {message: "User does not exist. Please signup."})
      }
      req.session.currentUser = user

      // return res.render('index', user)
      res.redirect("/")
    }
  }catch(e){
    console.error(e)
  }
}
//POST SIGNUP
const signup = async (req,res,next) =>{
  try{
    const {name, lastname, age, country, level, username, email, password} = req.body;
    const isMissingCredentials = !email || !country || !password || !name || !lastname || !age || !username || !level 
    if(isMissingCredentials){
      res.render('index', {message: "Missing fields"})
    }
    if(!hasCorrectPasswordFormat){
      res.render('index', {message: "Invalid password format"})
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedpassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
      name,
      lastname,
      age, 
      country,
      level,
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
      res.render('index', {message: 'El usuario ya existe.'})
    }
    //Mostrar el error de validacion
    if(isMongooseErrorValidation(e)){
      console.error(e)
      res.render('index', {message: 'Failed validation'})
    }
  }
}

//LOGOUT
const logout = async (req, res) => {
  try {
    await req.session.destroy();
    //Redirect index
    res.redirect("/");
  } catch(e) {
    console.error(e)
  }
};


module.exports = {login, signup, userLogin, logout}