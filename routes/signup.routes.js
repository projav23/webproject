const express = require('express');
const router = express.Router();
const {showFormSignup, signup} =  require('../controllers/auth.controller')

router.post('/', signup)

module.exports = router