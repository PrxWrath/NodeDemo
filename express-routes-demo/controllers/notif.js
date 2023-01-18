const path = require('path');
const root = require('../utils/path');

exports.postSuccess = (req,res,next)=>{
    res.sendFile(path.join(root, 'views', 'success.html'));    
}

exports.notFound = (req,res,next)=>{
    res.status(404).sendFile(path.join(root, 'views', 'NotFound.html'));
}