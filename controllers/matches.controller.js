const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const mongoose = require('mongoose')
const moment = require('moment')

//POST MATCH
const createMatch = async (req,res,next) => {
  try{
    const {center, date, numberPlayers, level, esport, location, acceptedGuests, pendingGuests} = req.body;
    const isMissingCredentials = !center || !date || !numberPlayers || !level || !esport || !location
    if(isMissingCredentials){
      res.render('newgame', {message: "Debes rellenar todos los campos."})
    }

    const newmatch = await Matches.create({
      center,
      level,
      location,
      esport,
      numberPlayers,
      date,
      host: req.session.currentUser._id,
      acceptedGuests: req.session.currentUser._id,
      pendingGuests
    })
    const updateUser = await Users.findByIdAndUpdate(
      req.session.currentUser._id, 
      {$addToSet:{hostedEvents: newmatch._id,}},
      {new:true}
      )
    res.redirect('/matches')
    console.log(updateUser)
    console.log(newmatch)
  } catch(e){
    console.error(e)
  }
}
//Mostrar el formulario crear partido
const showFormMatch = async (req,res,next) => {
  const host = req.session.currentUser
  res.render('newgame', {host})
}
//Mostrar listado de partidos
const showAllMatches = async (req,res, next) => {
  try{
    //Tengo que iterar sobre todos los pares para ver cual esta vacio
    for (const [key, value] of Object.entries(req.query)) {
      //Borrar el par vacio
      if(!value) delete req.query[key]
    }
    console.log(req.query)
    if(Object.keys(req.query).length){
      const filter = {...req.query};
      const matchfilter = await Matches.find(filter)
      res.render('list', {matchfilter})
    } else {
      const match = await Matches.find().sort({date: "asc"})
      console.log(match)
      res.render('list', {match})
    }

  } catch(e){
    console.error(e)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const {matchId} = req.params
    const match = await Matches.findById(matchId).populate("host")
    console.log(match)
    res.render('match-details', match)
  } catch(e){
    console.error(e)
  }
}

const updateMatchGuest = async (req,res,next) => {
  try {
    const {matchId} = req.params;
    const {pendingGuests} = req.body;
    const update = await  Matches.findByIdAndUpdate(
      matchId, 
      {$addToSet: {pendingGuests}},
      {new:true})
    const updateUser = await Users.findByIdAndUpdate(
      req.session.currentUser._id,
      {$addToSet: {pendingEvents: matchId}},
      {new: true})
    console.log(update)
    console.log(updateUser)
    res.redirect("/matches")
  }catch(e){
    console.error(e)
  }
}

const myMatches = async (req,res,next) => {
  try{
    const matches = await Matches.find({host: req.session.currentUser._id}).populate("host")
    console.log(matches)
    res.render('myMatches', {matches})
  }catch(e){
    console.error(e)
  }
}

const pendingMatches = async (req, res, next) => {
  try {
    const matches = await Matches.find({pendingGuests: req.session.currentUser._id})
    console.log(matches)
    res.render("pendingMatches", {matches})
  } catch (error) {
    console.error(error)
  }
}
const acceptedMatches = async (req, res, next) => {
  try {
    //Anadir que el host no sea el usuario de currentUser
    const matches = await Matches.find({$and: [{'acceptedGuests': req.session.currentUser._id}, {host: {$ne: req.session.currentUser._id}}]})
    console.log(matches)
    res.render("acceptedMatches", {matches})
  } catch (error) {
    console.error(error)
  }
}

module.exports = {createMatch,myMatches,acceptedMatches, showAllMatches, showFormMatch, getDetails, updateMatchGuest, pendingMatches}