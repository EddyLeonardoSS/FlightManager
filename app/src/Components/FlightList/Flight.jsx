import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { EditForm1 } from '../Form/Form';
import { Box } from '../Styles/StyledComponents';




export const Flight = () => {

    // Grabs object from navigate state in current URL
    const location = useLocation([]);

    const [flight, setFlight] = useState(location);


    // location.state == flights

    const deleteFlight = id => {

        axios.delete(`http://localhost:8085/${id}`);

    }

    const updateFlight = (id, newFlight) => {
console.log( { ...newFlight })
        axios.put(`http://localhost:8085/${id}`, { ...newFlight }
        );
    }

    const done = (id) => {
        const input = document.getElementById("test");
        const doneButton = document.getElementById("doneButton");
        const editButton = document.getElementById("editButton");
        flight.state.flightNumber = input.innerHTML;
       
        doneButton.innerHTML = "Done";

        input.contentEditable = false;
        input.removeAttribute('style');

        editButton.setAttribute('style', 'opacity: 100;');
        doneButton.setAttribute('style', 'opacity: 0;');
        updateFlight(id, flight);

    }
    const edit = () => {
        const input = document.getElementById("test");
        const editButton = document.getElementById("editButton");
        const doneButton = document.getElementById("doneButton");

        input.contentEditable = true;
        input.setAttribute('style', 'border: solid black 2px; padding-right: 23px; padding-left: 23px;');
        editButton.setAttribute('style', 'opacity: 0;');
        doneButton.setAttribute('style', 'opacity: 100;');
        console.log("editable")


    }


    return (
        <>
            <Box>
                <div>
                    <h3>Flight Number:   <span id='test'>{location.state.flightNumber} </span></h3>
                    <p >Departure: {location.state.departDate} at {location.state.departTime} from {location.state.departAirport}</p>
                    <p >Arrival: {location.state.arriveDate} at {location.state.arriveTime} at {location.state.arriveAirport}</p>
                    <p >Number of Passengers: {location.state.numPassengers}</p>
                    <p > Passenger Limit: {location.state.passengerLimit}</p>
                    <button id='editButton' onClick={() => edit(location.state)}>Edit Flight</button>
                    <button id='doneButton' onClick={() => done(location.state._id)}>Done</button>
                    <Link to="/flights"><button onClick={() => deleteFlight(location.state._id)}>Delete</button></Link>
                </div>
            </Box>
            <EditForm1/>
        </>
    )
}



export default Flight;