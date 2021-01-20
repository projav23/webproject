const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const mongoose = require('mongoose')
const nodemailer = require("nodemailer")
const templates = require('../public/templates/template')




const getProfile = async (req, res, next) => {
  try {
  const {userId} = req.params
  const user = await Users.findById(userId)
  //Data para el grafico Tenis individual
  const chartGames = await Matches.find({$and: [{acceptedGuests:{$in: userId}},{status: "Finalizado"}, {esport: "Tenis"}, {numberPlayers: 2}]})
  //Data para el grafico Tenis dobles
  const chartGamesDob = await Matches.find({$and: [{acceptedGuests:{$in: userId}},{status: "Finalizado"}, {esport: "Tenis"}, {numberPlayers: 4}]})
  //Puntuacion tenis
  const chartScore = await Users.findById(userId, {scoreTenisInd: 1, scoreTenisDob: 1})
  //Data para el grafico Padel individual
  const chartGamesPadel = await Matches.find({$and: [{acceptedGuests:{$in: userId}},{status: "Finalizado"}, {esport: "Padel"}]})
  //Data para el grafico padel dobles
  const chartGamesPadelDob = await Matches.find({$and: [{acceptedGuests:{$in: userId}},{status: "Finalizado"}, {esport: "Padel"}]})
  //Puntuacion padel
  const chartScorePadel = await Users.findById(userId, {scorePadelInd: 1, scorePadelDob: 1})
  //Estadistica ultimos partidos Tenis
  const matchStats = await Matches.find({$and: [{acceptedGuests:{$in: userId}},{status: "Finalizado"}, {esport: "Tenis"}]}).sort({date:-1}).limit(10)
  const topScoreInd = await Users.find({},{scoreTenisInd:1, _id: 1, username: 1} ).sort({scoreTenisInd: -1})
  const topScoreDob = await Users.find({},{scoreTenisDob:1, _id: 1, username: 1} ).sort({scoreTenisDob: -1})
  const posInd = topScoreInd.findIndex(x => x.id === userId) + 1
  const posDob = topScoreDob.findIndex(x => x.id === userId) + 1
  //Estadistica ultimos partidos Padel
  const matchStatsPadel = await Matches.find({$and: [{acceptedGuests:{$in: userId}},{status: "Finalizado"}, {esport: "Padel"}]}).sort({date:-1}).limit(10)
  const topScoreIndPadel = await Users.find({},{scorePadelInd:1, _id: 1, username: 1} ).sort({scorePadelInd: -1})
  const topScoreDobPadel = await Users.find({},{scorePadelDob:1, _id: 1, username: 1} ).sort({scorePadelDob: -1})
  const posIndPadel = topScoreIndPadel.findIndex(x => x.id === userId) + 1
  const posDobPadel = topScoreDobPadel.findIndex(x => x.id === userId) + 1
  //Solicitudes
  const matches = await Matches.find({$and: [{host: userId}, {pendingGuests: {$ne: []}}]}).populate('pendingGuests center', {passwordHash: 0})
  if(matches.length === 0){
    res.render('profile', {message: "No tienes solicitudes pendientes", user, matchStats, posInd, posDob, chartGames, chartScore, userId, chartGamesPadel,chartScorePadel,matchStatsPadel, posIndPadel, posDobPadel, chartGamesDob, chartGamesPadelDob})
  } else {
  res.render('profile', {matches, user, matchStats, posInd, posDob, chartGames, chartScore, userId, chartGamesPadel,chartScorePadel,matchStatsPadel, posIndPadel, posDobPadel, chartGamesDob, chartGamesPadelDob})
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