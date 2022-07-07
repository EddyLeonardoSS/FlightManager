const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flightSchema = new Schema ({
    
    flightNumber: {
        name: 'flightNumber',
        type: 'number',
        unique: true
    },
    departDate: {
        name: 'departDate',
        type: 'String'
    },
    arriveDate: {
        name: 'arriveDate',
        type: 'String'
    },
    departTime: {
        name: 'departTime',
        type: 'String'
    },
    arriveTime: {
        name: 'arriveTime',
        type: 'String'
    },
    departAirport: {
        name: 'departAirport',
        type: 'String'
    },
    arriveAirport: {
        name: 'arriveAirport',
        type: 'String'
    },
    numPassengers: {
        name: 'numPassengers',
        type: 'number'
    },
    passengerLimit: {
        name: 'passengerLimit',
        type: 'number'
    }
});

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;