const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order_Model = require('../models/booking');
const Car = require("../models/car"); 

const  BookingController = require('../controllers/bookings');

router.get('/', BookingController.get_all_bookings );

router.post('/', BookingController.create_booking );

module.exports = router;

