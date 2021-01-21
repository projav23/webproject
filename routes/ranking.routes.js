const express = require("express");
const router = express.Router();
const {getRanking} = require('../controllers/ranking.controller')


router
.get("/", getRanking)

module.exports = router