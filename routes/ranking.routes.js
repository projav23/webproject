const express = require("express");
const router = express.Router();
const {getRanking} = require('../controllers/ranking.controller')
const {userLogin} =  require('../controllers/auth.controller')

router
.get("/:userId", userLogin, getRanking)

module.exports = router