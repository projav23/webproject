const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer")
const templates = require('../public/templates/template')




const getProfile = async (req, res, next) => {
  try {
  const {userId} = req.params
  const user = await Users.findById(userId)
  //Data para el grafico
  const chartGames = await Matches.find({$and: [{acceptedGuests:{$in: req.session.currentUser._id}},{status: "Finalizado"}]})
  const chartScore = await Users.findById(userId, {scoreInd: 1, scoreDob: 1})
  console.log(chartGames.length)
  console.log(chartScore.scoreInd)
  //Estadistica ultimos partidos
  const matchStats = await Matches.find({$and: [{acceptedGuests:{$in: req.session.currentUser._id}},{status: "Finalizado"}]}).sort({date:-1}).limit(10)
  const topScoreInd = await Users.find({},{scoreInd:1, _id: 1, username: 1} ).sort({scoreInd: -1})
  const topScoreDob = await Users.find({},{scoreDob:1, _id: 1, username: 1} ).sort({scoreDob: -1})
  const posInd = topScoreInd.findIndex(x => x.id === req.session.currentUser._id) + 1
  const posDob = topScoreDob.findIndex(x => x.id === req.session.currentUser._id) + 1
  const matches = await Matches.find({$and: [{host: req.session.currentUser._id}, {pendingGuests: {$ne: []}}]}).populate('pendingGuests center', {passwordHash: 0})
  if(matches.length === 0){
    res.render('profile', {message: "No tienes solicitudes pendientes", user, matchStats, posInd, posDob, chartGames, chartScore})
  } else {
  res.render('profile', {matches, user, matchStats, posInd, posDob, chartGames, chartScore})
  }
  } catch (e) {
  console.error(e)
  }
}

const editProfile = async (req,res,next) => {
  try {
    const {userId} = req.params;
    const {name, lastname, level, age, location} = req.body
    const user = await Users.findByIdAndUpdate(
      userId,
      {
        name: name,
        lastname: lastname,
        level: level
      },
      {new:true}
      )
      res.redirect(`/profile/${userId}`)
  } catch (e) {
  console.error(e)
  }
}

const sendEmail = async (req,res,next) => {
  try {
    const {asunto, mensaje, name} = req.body
    const {userId} = req.params
    const user = await Users.findById(userId)
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
      from: `"Together - ${name}" <togetherironhack@gmail.com>`,
      to: user.email, 
      subject: asunto, 
      text: mensaje,
      html: templates.templateContact(mensaje, name)
    })

    res.redirect(`/profile/${userId}`)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {getProfile, editProfile, sendEmail}