const express = require('express');
const router = express.Router();
const {getRequests, acceptedGuest, declineGuest} = require('../controllers/solicitudes.controller')

router
.get('/', getRequests)
.post('/:matchId/accept/:guestId', acceptedGuest)
.post('/:matchId/decline/:guestId', declineGuest)

module.exports = router