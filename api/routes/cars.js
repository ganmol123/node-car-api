const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Car_Model = require('../models/car')

const  CarController = require('../controllers/cars');

router.get('/getAllCars', CarController.get_all_cars)

router.post('/AddCar', CarController.add_car)

router.delete('/DeleteCar/:car_id', CarController.delete_car)

router.get('/getCarBooking/:car_id', CarController.get_car_booking)
 
module.exports = router;