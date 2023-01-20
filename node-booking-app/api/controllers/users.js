const User = require('../models/user');

exports.getUsers = async(req,res,next) => {
    try{
        const data = await User.findAll();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

exports.postAddUser = async(req,res,next) => {
    try{
        console.log(req.body)
        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        res.redirect('/users');
    }catch(err){
        console.log(err);
    }
}

exports.postEditUser = async(req,res,next) => {
    try{
        const uId = req.body.userId;
        const data = await User.findByPk(uId);
        data.name = req.body.name;
        data.email = req.body.email;
        data.phone = req.body.phone;
        await data.save();
        res.redirect('/users');
    }catch(err){
        console.log(err);
    }
}

exports.postDeleteUser = async(req,res,next) => {
    try{
        const uId = req.body.userId; 
        const data = await User.findByPk(uId);
        await data.destroy();
        res.redirect('/users');
    }catch(err){
        console.log(err);
    }
}