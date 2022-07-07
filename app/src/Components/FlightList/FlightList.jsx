import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FlightItem } from '../Styles/StyledComponents';



export const FlightList = () => {

    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();
    

    const getFlights = () => {
        console.log("Request from getflights");
        axios.get('http://localhost:8085/flights')
            .then(res => setFlights(res.data))
            .catch(err => console.error(err));

    }
    const viewDetails = flight => {
        navigate(`/flights/${flight._id}`, { state: { ...flight } });
    }

   

    useEffect(() => {
        
        getFlights();
    }
    
       
    , [])

    // Maps out the array from get request containing flight information
    // Checks for flight object, else returns no data found
    return (
        <>
        
            <Box >
            
                {flights ? flights.map(flights => {
                    return (
                        <>
                            
                                <FlightItem key={flights._id}>
                                    <h3>Flight Number: {flights.flightNumber}</h3>
                                    <p>Departure Date: {flights.departDate ? flights.departDate : "TBA"}</p>
                                    <button onClick={() => viewDetails(flights)}>View Details</button>
                                    
                                </FlightItem>
                            
                        </>
                    )
                }) : <h3>No data found</h3>}
               
            </Box>
            
        </>
    )
}



