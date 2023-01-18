const express = require('express');
const router = express.Router()
const path = require('path');
const root = require('../utils/path');

router.get('/add-product', (req,res,next)=>{
    res.sendFile(path.join(root, 'views', 'add-product.html'))
});
  
router.post('/product', (req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
  })

module.exports = router;