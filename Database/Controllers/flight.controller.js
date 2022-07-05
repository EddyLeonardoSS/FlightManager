const Flight = require('../Models/flights.model');


const createFlight = async ({ flightNumber, departDate, arriveDate, departTime, arriveTime, departAirport, arriveAirport, numPassengers, passengerLimit }) => {

    try {
        const flight = new Flight({
            flightNumber,
            departDate,
            arriveDate,
            departTime,
            arriveTime,
            departAirport,
            arriveAirport,
            numPassengers,
            passengerLimit
        });

        await flight.save();

        return flight._id;

    }
    catch (err) {
        console.log(err)
        throw { status: 400, message: err };
    }
}

const findFlightById = async id => {
    try {
        const flight = await Flight.findById(id);
        if (flight == null) {
            throw `No flight with id: ${id}`;
        }
        return flight;
    }
    catch (err) {
        console.log(err)
        throw { status: 400, message: err };
    }
}


const findAllFlights = async (limit = 0) => {
    const flights = await Flight.find();
    return flights;
}

const deleteFlight = async id => {
    const flights = await Flight.deleteOne({_id: id});
    return flights;
};

const updateFlight = async (id, updates) => {
    // updates is passed as a JSON object from the request body, which holds the state
    const flight = await Flight.findByIdAndUpdate( id, updates.state, {new: true});

}


module.exports = { createFlight, findFlightById, findAllFlights, deleteFlight, updateFlight };