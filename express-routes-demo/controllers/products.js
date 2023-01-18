const path = require('path');
const root = require('../utils/path');

exports.getAddProducts = (req,res,next)=>{
    res.sendFile(path.join(root, 'views', 'add-product.html'))
}

exports.postProducts = (req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
}

