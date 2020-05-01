const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car_Model = require('../models/car');

//return all cars we have
router.get('/', (req, res, next)=>{
    Car_Model.find()
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err})
        });
});

//Think of this is adding a car
router.post('/', (req, res, next)=>{
    const car = new Car_Model({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    car.save() //save is used to store in database
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: 'Handling post Requests to /cars',
                createdCar: result 
            });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error: err})
    });
});


router.get('/:carId', (req, res, next)=>{
    const id = req.params.carId;
    Car_Model.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if(result) {
                res.status(200).json(result);
            }else{
                res.status(404).json({message: 'No Valid entry found for provided ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});


router.patch('/:carId', (req, res, next)=>{
    const id = req.params.carId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value; 
    }
    Car_Model.update({_id:id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
});


router.delete('/:carId', (req, res, next) => {
    const id = req.params.carId;
    Car_Model.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
})
 
module.exports = router;