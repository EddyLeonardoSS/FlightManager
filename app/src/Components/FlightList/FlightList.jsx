import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { EditFlightModal, AddFlightModal } from '../FormPopup';
import { DeleteSuccess } from '../Snackbars';



export const FlightList = () => {
    const location = useLocation([]);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const getFlights = async () => {
        console.log("Request from getflights");
        await axios.get('http://localhost:8085/flights')
            .then(res => setFlights(res.data))
            .catch(err => console.error(err));

    }

    // "Navigates" to the same page, essentially passing the current state of the specified flight to the editForm
    const viewDetails = flight => {
        navigate(`/flights`, { state: { ...flight } });
    }

    //  State for expansion of the cards
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

    // function necessary for expanding the cards and revealing more information about each flight
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

    // SX is essentially style={}.
    // This overrides the on hover effect
    const deleteHoverSX = {
        '&:hover': {
            color: 'red'
        },
        marginBottom: "6px",
    }

    const deleteFlight = async id => {
        setChecked(true);
        await axios.delete(`http://localhost:8085/${id}`);

    }
    useEffect(() => {
        getFlights();
    }
        , [])

    // Maps out the array from get request containing flight information
    // Checks for flight object, else returns no data found
    return (
        <>

            <Grid container spacing={1} padding={5} position="absolute"
                style={{
                    backgroundImage: "url('https://th.bing.com/th/id/OIP.q0jOUZASmAdOqcj38pP65QHaD3?pid=ImgDet&rs=1')",
                    backgroundRepeat: " no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed"
                }}>
                {/* Maps the array of flight objects from the database and generates a Card for each flight*/}
                {flights ? flights.map(flight => {
                    return (
                        <>
                            <Grid padding={5} marginLeft={2} >
                                <Card sx={{
                                    width: 345, backgroundColor: "#c2dde6"
                                }} key={flight._id}>
                                    <CardHeader


                                        action={
                                            // Adding Flight
                                            <IconButton aria-label="settings">
                                                <AddFlightModal />
                                            </IconButton>
                                        }
                                        title={`Flight ${flight.flightNumber}`}
                                        subheader={`Departure Date: ${flight.departDate ? flight.departDate : "TBA"}`}
                                    />

                                    <CardContent sx={{ marginLeft: 3.5 }}>
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
                                            <DeleteForeverRounded sx={deleteHoverSX} />
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




