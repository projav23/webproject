const express = require('express');
const router = express.Router();
const {showFormLogin, login, signup,renderSignIn,renderSignUp} = require('../controllers/auth.controller')

router
.get("/login",renderSignIn)
.post('/login',login)

.get("/signup",renderSignUp)
.post("/signup", signup)


module.exports = router