const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    carid: { type: mongoose.Schema.Types.ObjectId, ref: 'Car_Model'},
    cust_name: { type: String, required: true},
    cust_ph: { type: Number, required: true},
    days: {type: Number, default: 1},
    issue_date: {type: String},
    return_date: {type: String},  
})

module.exports = mongoose.model('Booking_Model', bookingSchema);

