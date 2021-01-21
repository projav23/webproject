const express = require('express');
const router = express.Router();
const {showFormLogin, login, signup,renderSignIn} = require('../controllers/auth.controller')

router
.get("/login",renderSignIn)//No funciona la ruta
.post('/login',login)

.get("/signup",signup)
.post("/signup", signup)


module.exports = router