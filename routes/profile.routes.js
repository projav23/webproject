const express = require("express");
const router = express.Router();
const {getProfile, editProfile, sendEmail} = require("../controllers/profile.controller")
const {acceptedGuest, declineGuest} = require('../controllers/solicitudes.controller')

router
.get("/:userId", getProfile)
.post('/:userId/update', editProfile)
.post('/:userId/contact', sendEmail)
.post('/:userId/:matchId/accept/:guestId', acceptedGuest)
.post('/:userId/:matchId/decline/:guestId', declineGuest)


module.exports = router