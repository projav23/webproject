const express = require('express');
const router = express.Router();
const {showFormLogin, login} = require('../controllers/auth.controller')

router.get('/login', showFormLogin).post('/login', login)

module.exports = router