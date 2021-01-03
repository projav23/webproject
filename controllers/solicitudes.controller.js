const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const mongoose = require('mongoose')

const getRequests = async (req,res, next) => {
  try {
    const pendingToAccept = await Matches.find({$and: [{host: req.session.currentUser._id}, {pendingGuests: {$ne: []}}]}).populate('pendingGuests')
    console.log(pendingToAccept)

    res.render('solicitudes', {pendingToAccept})
  } catch (error) {
    console.error(error)
  }
}



module.exports = {getRequests}