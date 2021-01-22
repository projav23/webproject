const express = require('express');
const router = express.Router();
const {acceptedGuest, declineGuest} = require('../controllers/solicitudes.controller')

router
.post('/:matchId/accept/:guestId', acceptedGuest)
.post('/:matchId/decline/:guestId', declineGuest)

module.exports = router