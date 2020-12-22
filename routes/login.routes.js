const express = require('express');
const router = express.Router();
const {showFormLogin, login} = require('../controllers/auth.controller')

router.post('/', login)

module.exports = router