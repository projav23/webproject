const Users = require('../models/User.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


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
      password: hashedpassword
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
    const user = await Users.findOne({email})
  
    if(!user){
      res.render('signup', {message: "User does not exist. Please signup."})
    }
    req.session.currentUser = user._id
    return res.render('index')
  }catch(e){
    console.error(e)
  }
}

module.exports = {showFormLogin, showFormSignup, login, signup}