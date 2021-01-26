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
  //Tenis
  const topScoreInd = await Users.find({},{scoreTenisInd:1, _id: 1, username: 1} ).sort({scoreTenisInd: -1})
  const posInd = topScoreInd.findIndex(x => x.id === userId) + 1
  const noTop = posInd > 3
  // console.log("pos",posInd);
  // console.log("noTop",noTop);
  const rankingDob = await Users.find().sort({scoreTenisDob: -1}).populate("comunidad")
  const rankingIndPadel = await Users.find().sort({scorePadelInd: -1}).populate("comunidad")
  const rankingDobPadel = await Users.find().sort({scorePadelDob: -1}).populate("comunidad")
  res.render("ranking", {rankingInd, rankingDob, rankingIndPadel, rankingDobPadel, userId, user,posInd,noTop})
  } catch (e) {
  console.error(e)
  }
}


module.exports = {getRanking}