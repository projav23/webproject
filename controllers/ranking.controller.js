const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const Centros = require('../models/Centros.model')
const Comunidades = require('../models/Comunidades.model')
const mongoose = require('mongoose')


const getRanking = async (req,res,next) => {
  try {
  const rankingInd = await Users.find().sort({scoreTenisInd: -1}).populate("comunidad")
  console.log(rankingInd)
  const rankingDob = await Users.find().sort({scoreTenisDob: -1}).populate("comunidad")
  const rankingIndPadel = await Users.find().sort({scorePadelInd: -1}).populate("comunidad")
  const rankingDobPadel = await Users.find().sort({scorePadelDob: -1}).populate("comunidad")
  res.render("ranking", {rankingInd, rankingDob, rankingIndPadel, rankingDobPadel})
  } catch (e) {
  console.error(e)
  }
}

module.exports = {getRanking}