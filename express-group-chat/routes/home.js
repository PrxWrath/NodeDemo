const express = require('express');
const fs = require('fs');
const router = express.Router()
router.get('/', (req,res,next)=>{
    let chats = fs.readFile('./chats.txt', 'utf8', (err, data)=>{
        if(err){
            console.log(err);
            res.send(`<body onload="document.getElementById('user').value = localStorage.getItem('Username')">
                <form action="/message" method="POST">
                    <label>Message:</label>
                    <input type="text" name="msg"/>
                    <input id="user" name="user" style="display:none"/>
                    <button>Send</button>
                </form></body>`
            )
        }else{
            res.send(`<body onload="document.getElementById('user').value = localStorage.getItem('Username')">
                <p>${data}</p>
                <form action="/message" method="POST">
                    <label>Message:</label>
                    <input type="text" name="msg"/>
                    <input id="user" name="user" style="display:none"/>
                    <button>Send</button>
                </form></body>`
            )   
        }
        
    })
})

router.post('/message', (req,res,next)=>{
    let data = `${req.body.user}: ${req.body.msg}`;
    fs.appendFile('./chats.txt', data, (err)=>{
        if(err) console.log(err);
    })
    res.redirect('/');
})
module.exports = router;