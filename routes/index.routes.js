const express = require('express');
const router = express.Router();

router
.get('/', (req,res,next)=>{
  res.render('index')
  console.log(req.session.currentUser)
})

module.exports = router