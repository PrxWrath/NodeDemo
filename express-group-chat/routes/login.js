const express = require('express');
const router = express.Router()

router.get('/login', (req,res,next)=>{
    res.send(`<form onsubmit = "localStorage.setItem('Username', document.getElementById('uName').value)" action="/user" method="POST">
      <label>UserName:</label>
      <input type="text" name="uName" id="uName"/>
      <button>Login</button>
    </form>`)
  })

router.post('/user', (req,res,next)=>{
    res.redirect("/");
  })

module.exports = router;