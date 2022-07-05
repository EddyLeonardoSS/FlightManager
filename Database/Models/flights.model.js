const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flightSchema = new Schema ({
    
    flightNumber: Number,
    departDate: String,
    arriveDate: String,
    departTime: String,
    arriveTime: String,
    departAirport: String,
    arriveAirport: String,
    numPassengers: Number,
    passengerLimit: Number
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;