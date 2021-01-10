const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const mongoose = require('mongoose')

const getRequests = async (req,res, next) => {
  try {
    const matches = await Matches.find({$and: [{host: req.session.currentUser._id}, {pendingGuests: {$ne: []}}]}).populate('pendingGuests', `username`)
    if(matches.length === 0){
      res.render('solicitudes', {message: "No tienes solicitudes pendientes"})
    }
    res.render('solicitudes', {matches})

  } catch (error) {
    console.error(error)
  }
}

const acceptedGuest = async (req, res, next) => {
  try {
  const {matchId} = req.params
  const {guestId} = req.params
  const match = await Matches.findByIdAndUpdate(
    matchId,
    {
      $addToSet: { acceptedGuests: guestId },
      $pull: { pendingGuests: guestId }
    },
    {new: true}
    )
  
  const user = await Users.findByIdAndUpdate(
    guestId,
    {
      $addToSet: {attendedEvents: matchId},
      $pull: {pendingEvents: matchId}
    },
    {new: true}
    )
  res.redirect("/")
  } catch (e) {
  console.error(e)
  }
}
const declineGuest = async (req, res, next) => {
  try {
  const {matchId} = req.params
  const {guestId} = req.params
  const match = await Matches.findByIdAndUpdate(
    matchId,
    {$pull: { pendingGuests: guestId }},
    {new: true}
    )

  const user = await Users.findByIdAndUpdate(
    guestId,
    {$pull: {pendingEvents: matchId}},
    {new: true}
    )
  res.redirect("/solicitudes")
  } catch (e) {
  console.error(e)
  }
}

module.exports = {getRequests, acceptedGuest, declineGuest}