const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const homeRoute = require('./routes/home');

app.use(bodyParser.urlencoded({extended:false}));
app.use(loginRoute);
app.use(homeRoute);
app.use((req,res,next)=>{
    res.status(404).send("<h1>Page Not Found!</h1>")
})

app.listen(4000);