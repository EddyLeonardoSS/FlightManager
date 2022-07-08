import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownBox, SearchInput } from '../Styles/StyledComponents';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteForeverRounded } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { AddFlightModal, EditFlightModal } from '../FormPopup';
import { DeleteSuccess } from '../Snackbars';




export const SearchFlights = () => {

    const location = useLocation([]);
    const [flightList, setFlights] = useState([]);
    const navigate = useNavigate(null);
    const [ref, setRef] = useState({});
    const [checked, setChecked] = useState(false);

    console.log(location)
    const getFlights = () => {
        console.log("Request from searchFlights");
        axios.get('http://localhost:8085/flights')
            .then(res => setFlights(res.data))
            .catch(err => console.error(err));

    }
    const viewDetails = flight => {
        navigate(`/searchFlights`, { state: { ...flight } });
    }


    // Loops through array of flight objects and sets ref to specified flight object
    const searchFlights = (flight, dropdown) => {
        const input = document.getElementById("search");
        if (dropdown === "flightNumber" || dropdown === "numPassengers" || dropdown === "passengerLimit") {
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
    const deleteFlight = async id => {
        setChecked(true);
        await axios.delete(`http://localhost:8085/${id}`);

    }

    useEffect(() => {
        getFlights();
    }, [])


    const handleChange = (event) => {
        event.preventDefault();
        // Passes specific flight to searchFlights from input field
        const dropdown = document.getElementById("searchMenu");
        console.log(dropdown.value)
        searchFlights(event.target.value, dropdown.value);
    }

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;

        return <IconButton {...other} />;
    })
        (({ theme, expand }) => ({

            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        }));
    const [expanded, setExpanded] = useState({
        isExpanded: false,
        key: ''
    });

    // Handles card expand and specifies the id of the flight/card to avoid expanding all cards
    const handleExpandClick = (id, e) => {

        setExpanded({
            isExpanded: !e,
            key: id
        });
    };

     // SX is essentially style={}.
    // This overrides the on hover effect
    const deleteHoverSX = {
        '&:hover': {
            color: 'red'
        },
        marginBottom: "6px",
    }

    return (
        <>
            <DropdownBox>
                <label htmlFor='searchMenu'>Filter Search by:  </label>
                <Dropdown id='searchMenu' onChange={handleChange}>
                    <option value="flightNumber" >Flight Number</option>
                    <option value="departDate" >Depature Date</option>
                    <option value="arriveDate" >Arrival Date</option>
                    <option value="departTime" >Depature Time</option>
                    <option value="arriveTime" >Arrival Time</option>
                    <option value="departAirport" >Depature Airport</option>
                    <option value="arriveAirport" >Arrival Airport</option>
                    <option value="numPassengers" >Number of Passengers</option>
                    <option value="passengerLimit" >Passenger Limit</option>
                </Dropdown>
            </DropdownBox>
            <DropdownBox>
                <SearchInput type='number' defaultValue={""} placeholder="Search..." id='search' onChange={handleChange}></SearchInput>

            </DropdownBox>





            <Grid container spacing={1} padding={5} position="absolute" >
                {ref.flightNumber !== 0 ? flightList.filter(flight => flight[document.getElementById("searchMenu").value] === ref[document.getElementById("searchMenu").value]).map(flight => {
                    return (
                        <>
                            <Grid padding={5} position="unset" >
                                <Card sx={{ width: 345, backgroundColor: "#c2dde6" }} key={flight._id}>
                                    <CardHeader

                                        action={
                                            <IconButton aria-label="settings">
                                                <AddFlightModal />
                                            </IconButton>
                                        }
                                        title={`Flight ${flight.flightNumber}`}
                                        subheader={`Departure Date: ${flight.departDate ? flight.departDate : "TBA"}`}
                                    />

                                    <CardContent sx={{ marginLeft: 4 }}>
                                        <Typography variant="h3" color="text" >
                                            {`${flight.departAirport}`}
                                            <IconButton aria-label="settings">
                                                <FlightTakeoffIcon sx={{ fontSize: 42, marginLeft: 1, marginRight: 1, color: "black" }} />
                                            </IconButton>
                                            {`${flight.arriveAirport}`}
                                        </Typography>


                                    </CardContent>
                                    <CardActions disableSpacing>
                                        {/* location is being passed as the current flight state, allowing the form to be preloaded with the information */}
                                        <IconButton aria-label="Edit Flight" onClick={() => viewDetails(flight)}>
                                            <EditFlightModal flight={location} />
                                        </IconButton>

                                        <IconButton aria-label="delete" onClick={() => deleteFlight(flight._id)}>
                                            <DeleteForeverRounded  sx={deleteHoverSX} />
                                        </IconButton>
                                        <ExpandMore
                                            expand={expanded.isExpanded}
                                            onClick={() => handleExpandClick(flight._id, expanded.isExpanded)}
                                            aria-expanded={expanded.isExpanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>
                                    </CardActions>
                                    <Collapse in={expanded.isExpanded && expanded.key === flight._id} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>
                                                <p>Flight Number:  <span style={{ fontWeight: 'bold' }}>{flight.flightNumber}</span></p>
                                                <p >Departure Date: <span style={{ fontWeight: 'bold' }}>{flight.departDate}</span></p>
                                                <p >Departure Time: <span style={{ fontWeight: 'bold' }}>{flight.departTime}</span></p>
                                                <p >Departure Airport: <span style={{ fontWeight: 'bold' }}>{flight.departAirport}</span></p>
                                                <p >Arrival Date: <span style={{ fontWeight: 'bold' }}>{flight.arriveDate}</span> </p>
                                                <p >Arrival Time: <span style={{ fontWeight: 'bold' }}>{flight.arriveTime}</span></p>
                                                <p >Arrival Airport: <span style={{ fontWeight: 'bold' }}>{flight.arriveAirport}</span></p>
                                                <p >Passengers: <span style={{ fontWeight: 'bold' }}>{flight.numPassengers}/{flight.passengerLimit}</span></p>
                                            </Typography>

                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Grid>
                        </>
                    )
                }) : <h3>No data found</h3>}
                {checked ?
                    <DeleteSuccess />
                    :
                    <></>
                }
            </Grid>

        </>
    )
}



