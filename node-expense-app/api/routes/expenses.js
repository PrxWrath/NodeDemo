const express = require('express')
const router = express.Router();
const expenseController = require('../controllers/expenses');

router.get('/', expenseController.getExpenses);
router.post('/add-expense', expenseController.postAddExpense);
router.post('/edit-expense', expenseController.postEditExpense);
router.post('/delete-expense', expenseController.postDeleteExpense);

module.exports = router