const mongoose = require('mongoose')
const Car_Model = require('../models/car')
const Book = require('../models/booking')

//Get a list of all the cars
exports.get_all_cars = (req, res, next) => {
    Car_Model.find()
        .select("-__v")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                cars: docs.map( doc => {
                    return{
                        _id:           doc._id,
                        car_name:      doc.car_name,
                        car_num:       doc.car_num,
                        price_per_day: doc.price_per_day,
                        capacity:      doc.capacity
                        }
                })
            }
            res.status(200).json(response)
        })
        .catch(err=> {
            console.log(err)
            res.status(500).json({error: err})
        })
}

//Add a car
exports.add_car = (req, res, next) => {
    const car = new Car_Model({
        _id: new mongoose.Types.ObjectId(),
        car_name:      req.body.car_name,
        car_num:       req.body.car_num,
        price_per_day: req.body.price_per_day,
        capacity:      req.body.capacity,
    });
    car.save() //save is used to store in database
        .then(result => {
            console.log(result);
            res.status(201).json({ 
                message: 'Car details added successfully',
                createdCar: {
                    _id:           result._id,
                    car_name:      result.car_name,
                    car_num:       result.car_num,
                    price_per_day: result.price_per_day,
                    capacity:      result.capacity
                }
            })
    })
    .catch( err=> {
        console.log(err);
        res.status(500).json({error: err})
    })
}

//delete a car
exports.delete_car = (req, res, next) => {
    const id = req.params.car_id;
    if(!Book.findById(id)){
    Car_Model.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
    }
    else{
        res.status(201).json({
            message: "This car is cannot be deleted as it's already booked"
        })
    }
}

//get Booking information of a particular car
exports.get_car_booking = (req, res, next) => {
    const id = req.params.car_id;
    if(Book.findById(id))
    {
        var query = { carid: id } 
        Book.find(query)
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
    else{
        res.status(201).json({
            message: "Booking for the above mentioned car does not exists."
        })
    }
}

