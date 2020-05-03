const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Car_Model = require('../models/car')

const  CarController = require('../controllers/cars');

router.get('/', CarController.get_all_cars)

router.post('/', CarController.add_car)

router.delete('/:carid', CarController.delete_car)
 
module.exports = router;