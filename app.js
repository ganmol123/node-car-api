const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const carRoutes = require('./api/routes/cars')
const bookingRoutes = require('./api/routes/bookings')

//CORS HEADERS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET', 'PUT', 'POST', 'PATCH', 'DELETE');
        return res.status(200).json({});
    }
    next();
})

//Connecting to MongoDB 
mongoose.connect('mongodb+srv://nodeplay:loda@cluster1-nvixw.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));


app.use(morgan('dev')); //Logging info
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Routes which will handle requests
app.use('/cars', carRoutes)
app.use('/bookings', bookingRoutes)

//Error Handling
app.use((req, res, next) => {
    const erro = new Error('Not Found!');
    error.status = 404;
    next(error); //forward the error request
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

module.exports = app;
