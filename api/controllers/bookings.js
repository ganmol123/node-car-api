const Booking_Model = require('../models/booking')
const Car = require("../models/car")
const mongoose = require('mongoose')

//Fetch all bookings
exports.get_all_bookings = (req, res, next)=>{
    Booking_Model.find()
        .select('-__v')
        .populate('car', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                bookings:  docs.map( doc => {
                    return {
                        _id:         doc._id,
                        carid:       doc.carid,
                        cust_name:   doc.cust_name,
                        cust_ph:     doc.cust_ph,
                        days:        doc.days,
                        issue_date:  doc.issue_date,
                        return_date: doc.return_date
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({error:err})
        })
}

//Create a booking
exports.create_booking = (req, res, next)=> {
    Car.findById(req.body.carid)
    .then(car => {
        const booking = new Booking_Model({
            _id:         mongoose.Types.ObjectId(),
            carid:       req.body.carid,
            cust_name:   req.body.cust_name,
            cust_ph:     req.body.cust_ph,
            days:        req.body.days,
            issue_date:  req.body.issue_date,
            return_date: req.body.return_date
        })
        return booking.save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Successfully Booked!',
            createdBooking: {
                _id:         result._id,
                carid:       result.carid,
                cust_name:   result.cust_name,
                cust_ph:     result.cust_ph,
                days:        result.days,
                issue_date:  result.issue_date,
                return_date: result.return_date
            }
        });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: err})
        });
}
