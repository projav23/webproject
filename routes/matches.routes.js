const express = require('express');
const router = express.Router();
const {showFormMatch, createMatch, showAllMatches} =  require('../controllers/auth.controller')

router
.get('/newgame', showFormMatch)
.post('/newgame', createMatch)
.get('/list', showAllMatches)


module.exports = router