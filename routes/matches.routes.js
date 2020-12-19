const express = require('express');
const router = express.Router();
const {showFormMatch, createMatch, showAllMatches, userLogin} =  require('../controllers/auth.controller')

router
.get('/newgame', userLogin, showFormMatch)
.post('/newgame', userLogin, createMatch)
.get('/list', userLogin, showAllMatches)


module.exports = router