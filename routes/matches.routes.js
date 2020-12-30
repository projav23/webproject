const express = require('express');
const router = express.Router();
const {showFormMatch,myMatches,acceptedMatches, pendingMatches,  createMatch, showAllMatches, getDetails, updateMatchGuest} =  require('../controllers/matches.controller')
const {userLogin} =  require('../controllers/auth.controller')

router
.get('/', userLogin, showAllMatches)
.get('/mymatches',userLogin, myMatches)
.get('/pendingmatches',userLogin, pendingMatches)
.get('/acceptedmatches',userLogin, acceptedMatches)
.get('/newgame', userLogin, showFormMatch)
.post('/newgame', userLogin, createMatch)
.get('/:matchId', userLogin, getDetails)
.post('/:matchId', userLogin, updateMatchGuest)



module.exports = router