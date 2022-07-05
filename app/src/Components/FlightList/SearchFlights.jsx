import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BoxSingle, FlightItem } from '../Styles/StyledComponents';
import { set } from 'mongoose';



export const SearchFlights = () => {

    const [flightList, setFlights] = useState([]);
    const navigate = useNavigate(null);
    const [ref, setRef] = useState({});

    const getFlights = () => {
        console.log("Request from searchFlights");
        axios.get('http://localhost:8085/flights')
            .then(res => setFlights(res.data))
            .catch(err => console.error(err));

    }
    const viewDetails = flight => {
        navigate(`/flights/${flight._id}`, { state: { ...flight } });
    }

    const searchFlights = flight => {
        // Loops through array of flight objects and sets ref to specified flight object
        let found = false;
        let count = 0;
        
        while(!found) {
            const flights = flightList[count];
            if (flight == flights.flightNumber) {

                setRef(flights);
                console.log(flights)
                found = true;
                
                
            }
            else if (flight !== flights.flightNumber) {
                console.log("no match")
                setRef({
                    flightNumber: 0
                })
                
                

            }
            count++;
            
        }
    }


    const handleChange = (event) => {
        // Passes specific flight to searchFlights from input field
        searchFlights(event.target.value);
        event.preventDefault();

    }

    useEffect(() => {
        getFlights();
    }, [])

    
    return (
        <>

            <label htmlFor='searchMenu'>Search  </label>
            <select id='searchMenu'>

                <option>Flight Number</option>
                <option>Depature Airport</option>

            </select>
            <input type='number' defaultValue={0} id='search' onChange={handleChange}></input>
            <BoxSingle>

                {ref ?

                    <FlightItem key={ref._id}>
                        <h3>Flight Number: {ref.flightNumber}</h3>
                        <p>Departure Date: {ref.departDate ? ref.departDate : "TBA"}</p>
                        <button onClick={() => viewDetails(ref)}>View Details</button>

                    </FlightItem>

                    :
                    <FlightItem>
                        <h3>No Flights found: </h3>
                        

                    </FlightItem>}

            </BoxSingle>

        </>
    )
}



