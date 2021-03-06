const Users = require('../models/User.model')
const Matches = require('../models/Matches.model')
const Centros = require('../models/Centros.model')
const mongoose = require('mongoose')
const moment = require('moment')





//POST MATCH
const createMatch = async (req,res,next) => {
  try{
    const {center, date, numberPlayers, level, esport, location, pendingGuests} = req.body;
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
      {$addToSet:{hostedEvents: newmatch._id}},
      {new:true}
      )
    res.redirect('/matches')

  } catch(e){
    console.error(e)
  }
}
//Mostrar el formulario crear partido
const showFormMatch = async (req,res,next) => {
  try {

    const host = req.session.currentUser
    const centers = await Centros.find()
    res.render('newgame', {host, centers})
  } catch (e) {
    console.error(e)
  }

}
//Mostrar listado de partidos
const showAllMatches = async (req,res, next) => {
  try{
    //Tengo que iterar sobre todos los pares para ver cual esta vacio
    for (const [key, value] of Object.entries(req.query)) {
      //Borrar el par vacio
      if(!value) delete req.query[key]
    }

    if(Object.keys(req.query).length){
      const filter = {...req.query};
      const matchfilter = await Matches.find({$and: [filter,{status:{$ne: 'Finalizado'}}]}).populate("center")
      //const matchfilter = await Matches.find(filter).populate("center")
      res.render('list', {matchfilter})
    } else {
      const match = await Matches.find({$and: [{}, {status:{$ne:'Finalizado'}}]}).sort({date: "asc"}).populate("center")
      res.render('list', {match})
    }

  } catch(e){
    console.error(e)
  }
}
//Mostrar detalles de los partidos
const getDetails = async (req, res, next) => {
  try {
    const {matchId} = req.params
    const match = await Matches.findById(matchId).populate("host acceptedGuests center playerWinners", {passwordHash: 0})

    let currentUserIsAccepted;
    match.acceptedGuests.forEach(user => {
      if(user._id.equals(req.session.currentUser._id)) {
        currentUserIsAccepted = true;
      }else {
        currentUserIsAccepted = false;
      }
    })

    res.render('match-details', {match, currentUserIsAccepted})
  } catch(e){
    console.error(e)
  }
}
//Incluye el usuario en pending cuando hace un join
const joinMatch = async (req,res,next) => {
  try {

    // if(Object.keys(req.body).length > 0){
    //   console.log("Entra en hacer el join")
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

      res.redirect("/matches")
    // } else {
    //   next()
    // }

  }catch(e){
    console.error(e)
  }
}
//Filtra los partidos que el usuario es host
const myMatches = async (req,res,next) => {
  try{
    const matches = await Matches.find({$and: [{host: req.session.currentUser._id},{status: {$ne:'Finalizado'}}]}).populate("host center")
    if (matches.length === 0){
      return res.render('myMatches', {message: "No se han encontrado partidos"})
    }
    res.render('myMatches', {matches})
  }catch(e){
    console.error(e)
  }
}
//Filtra los partidos que el usuario es pendingGuest
const pendingMatches = async (req, res, next) => {
  try {
    const matches = await Matches.find({pendingGuests: req.session.currentUser._id}).populate("center")
    if(matches.length === 0){
      return res.render("pendingMatches", {message: "No hay partidos pendientes"})
    }
    res.render("pendingMatches", {matches})
  } catch (error) {
    console.error(error)
  }
}
//Filtra los partidos que el usuario es aceptado y no es host
const acceptedMatches = async (req, res, next) => {
  try {
    //Anadir que el host no sea el usuario de currentUser
    const matches = await Matches.find({$and: [{'acceptedGuests': req.session.currentUser._id}, {host: {$ne: req.session.currentUser._id}}, {status: {$ne:'Finalizado'}}]}).populate("center")
    if(matches.length === 0){
      return res.render("acceptedMatches", {message:"No tienes partidos aceptados"})
    }
    res.render("acceptedMatches", {matches})
  } catch (error) {
    console.error(error)
  }
}
//Borrar partido si eres el owner
const deleteMatch = async (req,res, next) => {
  try {
  const {matchId} = req.params
  const match = await Matches.findByIdAndDelete(matchId)
  await Users.updateMany({}, {$pull: {hostedEvents: matchId, pendingEvents: matchId, attendedEvents: matchId}}, {multi: true})
  res.redirect('/matches')
  } catch (e) {
  console.error(e)
  }
}
const editMatch = async (req,res,next) => {
  try {

    const {matchId} = req.params;

    const match = await Matches.findByIdAndUpdate(
      matchId,
      {$pull: {acceptedGuests: req.session.currentUser._id}},
      {new: true}
    )

    const user = await Users.findByIdAndUpdate(
      req.session.currentUser._id,
      {$pull: {attendedEvents: matchId}},
      {new: true}
    )

    res.redirect("/matches")
  } catch (e) {
    console.error(e)
  }
}
const endMatch = async (req,res,next) => {
  try {
    const {matchId} = req.params;
    const match = await Matches.findByIdAndUpdate(
      matchId,
      {status: "Cerrado"},
      {new:true}
    )
    res.redirect(`/matches/${matchId}`)
  } catch (e) {
    console.error(e)
  }

}
const winners = async (req,res,next) => {
  try {
    if(Object.keys(req.body).length > 1){
      const {matchId} = req.params
      const {player1} = req.body;
      const {player2} = req.body;

      const matchTenis = await Matches.findById(matchId)
      console.log(matchTenis)
      if (matchTenis.esport === "Tenis"){
        const user1 = await Users.findByIdAndUpdate(
          player1,
          {$inc: {scoreTenisDob: 1}},
          {new: true}
        )
        const user2 = await Users.findByIdAndUpdate(
          player2,
          {$inc: {scoreTenisDob: 1}},
          {new: true}
        )
        const match = await Matches.findByIdAndUpdate(
          matchId,
          {
            $addToSet: {playersWinners: player1, player2},
            status: 'Finalizado'
          },
          {new: true}
        )
      } else {
        const user1 = await Users.findByIdAndUpdate(
          player1,
          {$inc: {scorePadelDob: 1}},
          {new: true}
        )
        const user2 = await Users.findByIdAndUpdate(
          player2,
          {$inc: {scorePadelDob: 1}},
          {new: true}
        )
        const match = await Matches.findByIdAndUpdate(
          matchId,
          {
            $addToSet: {playersWinners: player1, player2},
            status: 'Finalizado'
          },
          {new: true}
        )
      }
      res.redirect('/matches/')
    } else {
      const {matchId} = req.params
      const {player1} = req.body;
      const matchTenisP = await Matches.findById(matchId)
      console.log(matchTenisP)
      if (matchTenisP.esport === "Tenis"){
        const user1 = await Users.findByIdAndUpdate(
          player1,
          {$inc: {scoreTenisInd: 1}},
          {new: true}
        )
        const match = await Matches.findByIdAndUpdate(
          matchId,
          {
            status: 'Finalizado',
            $addToSet: {playerWinners: player1},
        },
          {new: true}
        )
      } else {
        const user1 = await Users.findByIdAndUpdate(
          player1,
          {$inc: {scorePadelInd: 1}},
          {new: true}
        )
        const match = await Matches.findByIdAndUpdate(
          matchId,
          {
            status: 'Finalizado',
            $addToSet: {playerWinners: player1},
        },
          {new: true}
        )
      }
      res.redirect('/matches/')
    }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {createMatch,deleteMatch,winners, endMatch, editMatch, myMatches,acceptedMatches, showAllMatches, showFormMatch, getDetails, joinMatch, pendingMatches}