const express = require('express');
const router = express.Router();
const {showFormLogin, login, signup} = require('../controllers/auth.controller')

router.post('/', login, signup)

module.exports = router