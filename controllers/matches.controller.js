const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const mongoose = require('mongoose')
const moment = require('moment')

//POST MATCH
const createMatch = async (req,res,next) => {
  try{
    const {center, date, numberPlayers, level, esport, location} = req.body;
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
      acceptedGuests,
      pendingGuests
    })
    res.render('list')
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
    console.log(req.query)
    console.log(Object.keys(req.query))
    //Tengo qu iterar sobre todos los pares para ver cual esta vacio
    for (const [key, value] of Object.entries(req.query)) {
      //Borrar el par vacio
      if(!value) delete req.query[key]
    }
    console.log(req.query)
    if(Object.keys(req.query).length){
      const filter = {...req.query};
      console.log(filter)
      const matchfilter = await Matches.find(filter)
      res.render('list', {matchfilter})
    } else {
      const match = await Matches.find()
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
    const match = await Matches.findById(matchId)
    console.log(req.session.currentUser._id)
    res.render('match-details', match)
  } catch(e){
    console.error(e)
  }
}

const updateMatchGuest = async (req,res,next) => {
  try {
    const {matchId} = req.params;
    const {pendingGuests} = req.body;
    const update = await Matches.findByIdAndUpdate(matchId, {pendingGuests},{new:true})
    console.log(update)
    res.redirect("/matches")
  }catch(e){
    console.error(e)
  }
}

module.exports = {createMatch, showAllMatches, showFormMatch, getDetails, updateMatchGuest}