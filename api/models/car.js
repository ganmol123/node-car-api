const mongoose = require('mongoose');
const carSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    car_name:      { type: String, required: true},
    car_num:       { type: String, required: true},
    price_per_day: { type: Number, required: true},
    capacity:      { type: Number, required: true}
})

module.exports = mongoose.model('Car_Model', carSchema);





// const mongoose = require('mongoose');
// const carSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: {type: String, require: true},
//     price: {type: Number, require: true},
//     capacity: {type: Number, require: true}
// })

// module.exports = mongoose.model('Car_Model', carSchema);
//equivalent to create table - mysql



