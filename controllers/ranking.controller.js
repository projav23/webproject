const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const Centros = require('../models/Centros.model')
const Comunidades = require('../models/Comunidades.model')
const mongoose = require('mongoose')


const getRanking = async (req,res,next) => {
  try {
  const {userId} = req.params
  user = await Users.findById(userId)
  const rankingInd = await Users.find().sort({scoreTenisInd: -1}).populate("comunidad")

  //Posición del ranking
  //Tenis Ind
  const topScoreInd = await Users.find({},{scoreTenisInd:1, _id: 1, username: 1} ).sort({scoreTenisInd: -1})
  const posInd = topScoreInd.findIndex(x => x.id === userId) + 1
  const noTop = posInd > 3
  //Tenis Dob
  const topScoreDob = await Users.find({},{scoreTenisDob:1, _id: 1, username: 1} ).sort({scoreTenisDob: -1})
  const posDob = topScoreDob.findIndex(x => x.id === userId) + 1
  const noTop1 = posDob > 3
  //Paddle
  const topScoreDobPadel = await Users.find({},{scorePadelDob:1, _id: 1, username: 1} ).sort({scorePadelDob: -1})
  const posDobPadel = topScoreDobPadel.findIndex(x => x.id === userId) + 1
  const noTop2 = posDobPadel > 3

  const rankingDob = await Users.find().sort({scoreTenisDob: -1}).populate("comunidad")
  const rankingIndPadel = await Users.find().sort({scorePadelInd: -1}).populate("comunidad")
  const rankingDobPadel = await Users.find().sort({scorePadelDob: -1}).populate("comunidad")
  res.render("ranking", {rankingInd, rankingDob, rankingIndPadel, rankingDobPadel, userId, user,posInd,noTop,posDob,noTop1,posDobPadel,noTop2})
  } catch (e) {
  console.error(e)
  }
}


module.exports = {getRanking}