const Users = require('../models/User.model')
const mongoose = require('mongoose')

const getProfile = async (req, res, next) => {
  try {
  const {userId} = req.params
  const user = await Users.findById(userId)
  res.render("profile", user)
  } catch (e) {
  console.error(e)
  }
}


module.exports = {getProfile}