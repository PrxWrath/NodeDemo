const express = require('express');
const router = express.Router()

router.get('/add-product', (req,res,next)=>{
    res.send(`<form action="/product" method="POST">
      <label>Title</label>
      <input type="text" name="title"/>
      <label>Size</label>
      <input type="text" name="size"/>
      <button>Add Product</button>
    </form>`)
  })
  
router.post('/product', (req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
  })

module.exports = router;