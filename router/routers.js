const express = require('express');
const DBController = require('../controllers/DBController');
const router = express.Router();

router.get('/getmods', DBController.getmods)
router.get('/getorders', DBController.getorders)
router.get('/getproducts', DBController.getproducts)
router.get('/getcheckouts', DBController.getcheckouts)

module.exports = router
