const express = require("express");
const router = express.Router();
const {getRankingTenis} = require('../controllers/ranking.controller')


router
.get("/", getRankingTenis)

module.exports = router