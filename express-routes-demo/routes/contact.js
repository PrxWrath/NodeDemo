const express = require('express');
const router = express.Router()
const contactController = require('../controllers/home');
const notifController = require('../controllers/notif');

router.get('/', contactController.getContact);
  
router.post('/success', notifController.postSuccess);

module.exports = router;