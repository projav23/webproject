const express = require('express');
const router = express.Router();
const {showFormSignup, signup} =  require('../controllers/auth.controller')

router.get('/signup', showFormSignup ).post('/signup', signup)

module.exports = router