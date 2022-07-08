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
    const viewDetails = flight => {
        navigate(`/flights`, { state: { ...flight } });
    }

    const [expanded, setExpanded] = useState({
        isExpanded: false,
        key: ''
    });

    const handleExpandClick = (id, e) => {
       
        setExpanded({
            isExpanded: !e,
            key: id
        });
    };

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

            <Grid container spacing={1} padding={5} position="absolute" >
                {flights ? flights.map(flight => {
                    return (
                        <>
                            <Grid padding={5} position="unset" >
                                <Card sx={{ width: 345 }} key={flight._id}>
                                    <CardHeader

                                        action={
                                            // Adding Flight
                                            <IconButton aria-label="settings">
                                                <AddFlightModal/>
                                            </IconButton>
                                        }
                                        title={`Flight ${flight.flightNumber}`}
                                        subheader={`Departure Date: ${flight.departDate ? flight.departDate : "TBA"}`}
                                    />

                                    <CardContent sx={{ marginLeft: 4 }}>
                                        <Typography variant="h3" color="text.secondary" >
                                            {`${flight.departAirport}`}
                                            <IconButton aria-label="settings">
                                                <FlightTakeoffIcon sx={{ fontSize: 42, marginLeft: 1, marginRight: 1 }} />
                                            </IconButton>
                                            {`${flight.arriveAirport}`}
                                        </Typography>


                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="Edit Flight" onClick={() => viewDetails(flight)}>
                                        <EditFlightModal flight = {location}/>
                                        </IconButton>
                                        
                                        <IconButton aria-label="delete" onClick={() => deleteFlight(flight._id)}>
                                            <DeleteForeverRounded />
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
                                                <p>Flight Number:  {flight.flightNumber}</p>
                                                <p >Departure Date: {flight.departDate}</p>
                                                <p >Departure Time: {flight.departTime}</p>
                                                <p >Departure Airport: {flight.departAirport}</p>
                                                <p >Arrival Date: {flight.arriveDate} </p>
                                                <p >Arrival Time: {flight.arriveTime}</p>
                                                <p >Arrival Airport: {flight.arriveAirport}</p>
                                                <p >Passengers: {flight.numPassengers}/{flight.passengerLimit}</p>

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




