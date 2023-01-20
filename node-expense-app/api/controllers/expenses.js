const Expense = require('../models/expense');

exports.getExpenses = async(req,res,next) => {
    try{
        const data = await Expense.findAll();
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

exports.postAddExpense = async(req,res,next) => {
    try{
        const data = await Expense.create({
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description
        });
        res.redirect('/expenses');
    }catch(err){
        console.log(err);
    }
}

exports.postEditExpense = async(req,res,next) => {
    try{
        const uId = req.body.expenseId;
        const data = await Expense.findByPk(uId);
        data.amount = req.body.amount;
        data.category = req.body.category;
        data.description = req.body.description;
        await data.save();
        res.redirect('/expenses');
    }catch(err){
        console.log(err);
    }
}

exports.postDeleteExpense = async(req,res,next) => {
    try{
        const uId = req.body.expenseId; 
        const data = await Expense.findByPk(uId);
        await data.destroy();
        res.redirect('/expenses');
    }catch(err){
        console.log(err);
    }
}