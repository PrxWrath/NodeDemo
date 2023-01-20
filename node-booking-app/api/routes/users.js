const express = require('express')
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.getUsers);
router.post('/add-user', userController.postAddUser);
router.post('/edit-user', userController.postEditUser);
router.post('/delete-user', userController.postDeleteUser);

module.exports = router