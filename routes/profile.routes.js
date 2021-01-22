const express = require("express");
const router = express.Router();
const {getProfile, editProfile, sendEmail} = require("../controllers/profile.controller")
const {acceptedGuest, declineGuest} = require('../controllers/solicitudes.controller')
const {userLogin} =  require('../controllers/auth.controller')

router
.get("/:userId",userLogin, getProfile)
.get("/:userId/solicitudes",userLogin, getProfile)
.post('/:userId/update', editProfile)
.post('/:userId/contact', sendEmail)
.post('/:userId/:matchId/accept/:guestId', acceptedGuest)
.post('/:userId/:matchId/decline/:guestId', declineGuest)


module.exports = router