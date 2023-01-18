const express = require('express');
const path = require('path');
const root = require('./utils/path');
const app = express();
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const contactRoute = require('./routes/contact');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoute);
app.use('/',shopRoute);
app.use('/contact', contactRoute);
app.use('/success', (req, res, next)=>{
    res.sendFile(path.join(root, 'views', 'success.html'));
});
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(root, 'views', 'NotFound.html'));
})

app.listen(4000);