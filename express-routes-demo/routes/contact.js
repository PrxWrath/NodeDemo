const express = require('express');
const router = express.Router()
const path = require('path');
const root = require('../utils/path');

router.get('/', (req,res,next)=>{
    res.sendFile(path.join(root, 'views', 'contact.html'))
});
  
router.post('/success', (req,res,next)=>{
    res.redirect("/success");
  })

module.exports = router;