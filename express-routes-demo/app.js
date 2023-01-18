const express = require('express');
const path = require('path');
const root = require('./utils/path');
const app = express();
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const contactRoute = require('./routes/contact');
const notifController = require('./controllers/notif');

app.use(express.static(path.join(root, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRoute);
app.use('/',shopRoute);
app.use('/contact', contactRoute);
app.use(notifController.notFound);

app.listen(4000);