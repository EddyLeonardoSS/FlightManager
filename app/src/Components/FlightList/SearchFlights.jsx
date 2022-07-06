import React from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Dropdown, DropdownBox, FlightItem, SearchInput } from '../Styles/StyledComponents';




export const SearchFlights = () => {

    const [flightList, setFlights] = useState([]);
    const navigate = useNavigate(null);
    const [ref, setRef] = useState({});
    const [selectRef, setSelectRef] = useState({
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: false,
    });

    const getFlights = () => {
        console.log("Request from searchFlights");
        axios.get('http://localhost:8085/flights')
            .then(res => setFlights(res.data))
            .catch(err => console.error(err));

    }
    const viewDetails = flight => {
        navigate(`/flights/${flight._id}`, { state: { ...flight } });
    }


    // Loops through array of flight objects and sets ref to specified flight object
    const searchFlights = (flight, dropdown) => {


        const input = document.getElementById("search");
        if (dropdown === "flightNumber") {
            input.setAttribute("type", "number");
        }
        else {
            input.setAttribute("type", "text");
        }

        let found = false;
        let count = 0;

        while (!found) {
            const flights = flightList[count];

            if (flight == flights[dropdown]) {

                setRef(flights);
                found = true;
            }
            else if (flight !== flights[dropdown]) {

                setRef({
                    flightNumber: 0,
                    departAirport: ""
                })
            }
            count++;
        }
    }


    const handleChange = (event) => {
        event.preventDefault();
        // Passes specific flight to searchFlights from input field
        const dropdown = document.getElementById("searchMenu");
        console.log(dropdown.value)
        searchFlights(event.target.value, dropdown.value);


    }

    useEffect(() => {
        getFlights();
    }, [])


    return (
        <>
            <DropdownBox>
                <label htmlFor='searchMenu'>Filter Search by:  </label>

                <Dropdown id='searchMenu' onChange={handleChange}>

                    <option value="flightNumber" >Flight Number</option>
                    <option value="departAirport" >Depature Airport</option>

                </Dropdown>


            </DropdownBox>
            <DropdownBox>
                <SearchInput type='number' defaultValue={""} placeholder="Search..." id='search' onChange={handleChange}></SearchInput>

            </DropdownBox>
            



            <Box>

                {ref.flightNumber !== 0 ? flightList.filter(flight => flight[document.getElementById("searchMenu").value] === ref[document.getElementById("searchMenu").value]).map(flights => {
                    return (
                        <>

                            <FlightItem >
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



