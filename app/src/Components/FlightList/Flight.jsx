import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { EditSuccess } from '../EditSuccess';

import { Box } from '../Styles/StyledComponents';
import { BasicModal } from '../FormPopup';



export const Flight = () => {

    // Grabs object from navigate state in current URL
    const location = useLocation([]);

    const [flight, setFlight] = useState(location);
    const [openPopup, setOpenPopup] = useState(false);

    // location.state == flights

    const deleteFlight = id => {

        axios.delete(`http://localhost:8085/${id}`);

    }

    const updateFlight = (id, newFlight) => {
        console.log({ ...newFlight })
        axios.put(`http://localhost:8085/${id}`, { ...newFlight }
        );
    }


    const edit = () => {
        setOpenPopup(true);
        console.log(openPopup);

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
                    <button id='editButton' onClick={edit}><BasicModal/></button>

                    <Link to="/flights"><button onClick={() => deleteFlight(location.state._id)}>Delete</button></Link>
                </div>
            </Box>
            
            
        </>
    )
}



export default Flight;