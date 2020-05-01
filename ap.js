const express = require("express");
const app = express();
const morgan = require('morgan'); //Logging info
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://node-car-api:' + process.env.MONGO_ATLAS_PW +'@cluster0-qvoey.mongodb.net/test?retryWrites=true&w=majority', 
{useUnifiedTopology: true,  useNewUrlParser: true});


//CORS HEADERS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    ); //which kind of headers may be send with the request
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET','PUT', 'POST', 'PATCH', 'DELETE');
        return res.status(200).json({});
    }
    next();
})


const carRoutes = require('./api/routes/cars')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev')); //Logging info
app.use(bodyParser.urlencoded({extended: false})) //false:simple bodies, true: extended rich bodies
app.use(bodyParser.json());

// Routes which will handel requests
app.use('/cars', carRoutes)
app.use('/orders', orderRoutes)

//Error Handling
/*The idea - if the execution reaches here, it means that 
none of the above routes were able to handle the request*/
app.use((req, res, next) => {
    const erro = new Error('Not Found!');
    error.status = 404;
    next(error); //forward the error request
 })

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
 });


module.exports = app;
