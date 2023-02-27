const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("63fc4fe6da360de1842f5a7a")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGO_CONNECT_URL)
.then(res=>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name: "Pratyush",
        email:"abc@gmail.com",
        cart: {items: []}
      })
      user.save();    
    }
  })
  app.listen(4000);
})
.catch(err=>{
  console.log(err);
})