const path = require('path');
const root = require('../utils/path');

exports.getShop = (req,res,next)=>{
    res.sendFile(path.join(root, 'views', 'shop.html'));
}

exports.getContact = (req,res,next)=>{
    res.sendFile(path.join(root, 'views', 'contact.html'))
}