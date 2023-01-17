const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product', (req,res,next)=>{
  res.send(`<form action="/product" method="POST">
    <label>Title</label>
    <input type="text" name="title"/>
    <label>Size</label>
    <input type="text" name="size"/>
    <button>Add Product</button>
  </form>`)
})
app.post('/product', (req,res,next)=>{
  console.log(req.body);
  res.redirect("/");
})

app.use('/', (req,res,next)=>{
    res.send('<h1>Hello From Express!!</h1>');
})

app.listen(4000);