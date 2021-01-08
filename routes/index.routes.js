const express = require('express');
const router = express.Router();
// const Users = require('../models/User.model')
const {getAllUsers} = require('../controllers/auth.controller')

router
.get('/', getAllUsers)

module.exports = router