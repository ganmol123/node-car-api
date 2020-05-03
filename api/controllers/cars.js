const mongoose = require('mongoose')
const Car_Model = require('../models/car')

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
    const id = req.params.carid;
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

