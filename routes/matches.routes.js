const express = require('express');
const router = express.Router();
const {showFormMatch,deleteMatch,editMatch,myMatches,acceptedMatches, pendingMatches,  createMatch, showAllMatches, getDetails, joinMatch} =  require('../controllers/matches.controller')
const {userLogin} =  require('../controllers/auth.controller')

router
.get('/', userLogin, showAllMatches)
.get('/mymatches',userLogin, myMatches)
.get('/pendingmatches',userLogin, pendingMatches)
.get('/acceptedmatches',userLogin, acceptedMatches)
.get('/newgame', userLogin, showFormMatch)
.post('/newgame', userLogin, createMatch)
.get('/:matchId', userLogin, getDetails)
.post('/:matchId', userLogin, joinMatch, editMatch)
// .post('/:matchId', userLogin, editMatch)
.post('/:matchId/delete', userLogin, deleteMatch)




module.exports = router