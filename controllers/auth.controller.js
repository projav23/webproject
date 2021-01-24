const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer")
const moment = require('moment')
const templates = require('../public/templates/template')



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
  res.redirect('/auth/login')
}
//POST LOGIN
const login = async (req,res,next) => {
  try{
    if(Object.keys(req.body).length > 3){
      //return next()
      res.render("signup")
    }else {
      const {email, password} = req.body
      const isMissingCredentials = !email || !password;
      if(isMissingCredentials){
        res.render('login', {message: "Missing credentials"})
      }
      const {passwordHash,...user} = await Users.findOne({email}).lean()
      if(!user){
        res.render('login', {message: "User does not exist. Please signup."})
      }
      const verifiedPassword = await bcrypt.compare(password, passwordHash);
      if (!verifiedPassword) {
        res.render('login', {message: "Invalid credentials"})
      }else {
        req.session.currentUser = user

        //return res.render('index', user)
        res.redirect("/")
      }
    }
  }catch(e){
    console.error(e)
  }
}
//GET LOGIN
const renderSignIn = async (req,res)=>{
  res.render("login")
}

//GET SIGNUP
const renderSignUp = async (req,res)=>{
  res.render("signup")
}


//POST SIGNUP
const signup = async (req,res,next) =>{
  try{
    const {name, lastname, age, country, level, username, email, password} = req.body;
    const isMissingCredentials = !email  || !password || !name || !lastname || !age || !username 
    
    if(isMissingCredentials){
      res.render('signup', {message: "Missing fields"})
    }
    if(!hasCorrectPasswordFormat){
      res.render('signup', {message: "Invalid password format"})
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedpassword = await bcrypt.hash(password, salt)

  const arrayImg = ["/images/shwartzman.png","/images/berretini.png","/images/barty.png","/images/bouchard.png","/images/player.png","/images/rublev.png","/images/zverez.png","/images/tsitsipas.png","/images/federer.png","/images/thiem.png","/images/medvedev.png","/images/kirilenko.png","/images/sharapova.png","/images/nadal.png","/images/djokovic.png",]
  function randomImg(array){
    const i = Math.floor(Math.random() * array.length);
  return array[i]
  }

    const user = await Users.create({
      name,
      lastname,
      age, 
      country,
      imgURL: randomImg(arrayImg),
      email,
      username,
      passwordHash: hashedpassword
    })
    

    const transporter = nodemailer.createTransport(
      {
        service: 'Gmail',
        auth: {
            user: process.env.NM_USER,
            pass: process.env.NM_PASS
        }
      }
    )
  
    await transporter.sendMail({
      from: '"Together" <togetherironhack@gmail.com>',
      to: email, 
      subject: `Bienvenido ${username}`, 
      text: username,
      html: templates.templateWelcome(username)
    })

    res.redirect("/")
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


//TRAER TODOS LOS USUARIOS PARA MOSTRARLOS EN EL PARTIAL DEL RANKING
const getAllUsers = async (req,res) => {
  try{
  const users = await Users.find();

  res.render('index',{users})
   
  }catch(e){
    console.error(e);
  }
}


module.exports = {login, signup, userLogin, logout, getAllUsers, renderSignIn,renderSignUp}