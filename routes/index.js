const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_contoller');


console.log('router loaded');

router.get('/', homeController.home);
module.exports = router;