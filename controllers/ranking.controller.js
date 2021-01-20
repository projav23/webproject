const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const Centros = require('../models/Centros.model')
const mongoose = require('mongoose')


const getRankingTenis = async (req,res,next) => {
  try {
  const rankingInd = await Users.find().sort({scoreTenisInd: -1})
  console.log(rankingInd)
  const rankingDob = await Users.find({esport: "Tenis"}).sort({scoreTenisDob: -1})

  res.render("ranking", {rankingInd, rankingDob})
  } catch (e) {
  console.error(e)
  }
}

module.exports = {getRankingTenis}