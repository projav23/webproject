const express = require('express');
const router = express.Router();
const {getRequests} = require('../controllers/solicitudes.controller')

router
.get('/', getRequests)
// .post('/:matchId/accept/:guestId', acceptRequest)
// .post('/:matchId/decline/:guestId', declineRequest)

module.exports = router