import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledForm } from '../Styles/StyledComponents';
import { EditSuccess } from '../EditSuccess';


export const Form = () => {

    // useState for handling state changes to the page


    const [flightInfo, setFlightInfo] = useState({
        flightNumber: 0,
        departDate: "",
        arriveDate: "",
        departTime: "",
        arriveTime: "",
        departAirport: "",
        arriveAirport: "",
        numPassengers: 0,
        passengerLimit: 0
    });

    // Handles updating the text of each input field
    const handleChange = (event) => {
        setFlightInfo(prev => ({ ...prev, [event.target.name]: event.target.value }));

        event.preventDefault();

    }

    // Handles the sumbit button and sends a POST request to the database
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8085/', {
            flightNumber: flightInfo.flightNumber,
            departDate: flightInfo.departDate,
            arriveDate: flightInfo.arriveDate,
            departTime: flightInfo.departTime,
            arriveTime: flightInfo.arriveTime,
            departAirport: flightInfo.departAirport,
            arriveAirport: flightInfo.arriveAirport,
            numPassengers: flightInfo.numPassengers,
            passengerLimit: flightInfo.passengerLimit
        })
            .then(res => {
                setFlightInfo(res.data);
            });

        // Sets input fields back to default values
        setFlightInfo({
            flightNumber: 0,
            departDate: "",
            arriveDate: "",
            departTime: "",
            arriveTime: "",
            departAirport: "",
            arriveAirport: "",
            numPassengers: 0,
            passengerLimit: 0
        })
    }


    return (
        <>
            <StyledForm>
                <form  >
                    <div>
                        <label>Flight Number:
                            <input name="flightNumber" type="number" placeholder="Flight Number" value={flightInfo.flightNumber} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Departure Date:
                            <input name="departDate" type="text" placeholder="MM/DD/YYYY" value={flightInfo.departDate} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Arrival Date:
                            <input name="arriveDate" type="text" placeholder="MM/DD/YYYY" value={flightInfo.arriveDate} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Departure Time:
                            <input name="departTime" type="text" placeholder="HH:mm" value={flightInfo.departTime} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Arrival Time:
                            <input name="arriveTime" type="text" placeholder="HH:mm" value={flightInfo.arriveTime} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Departure Airport:
                            <input name="departAirport" type="text" placeholder="Departure Airport" value={flightInfo.departAirport} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Arrival Airport:
                            <input name="arriveAirport" type="text" placeholder="Arrival Airport" value={flightInfo.arriveAirport} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Number of Passengers:
                            <input name="numPassengers" type="number" placeholder="Number of Passengers" value={flightInfo.numPassengers} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label>Passenger Limit:
                            <input name="passengerLimit" type="number" placeholder="Passenger Limit" value={flightInfo.passengerLimit} onChange={handleChange}></input>
                        </label></div>

                    <input type="submit" onClick={handleSubmit} />


                </form>

            </StyledForm>


        </>
    )
}
/*<FormContext.Provider value={flightInfo}>
                        <h1>{flightInfo}</h1>
            </FormContext.Provider>
            */
export const EditForm1 = () => {
    // useState for handling state changes to the page
    const location = useLocation([]);
    const [editFlightInfo, setEditFlightInfo] = useState(location);
    const [checked, setChecked] = useState(false);


    // Handles updating the text of each input field
    const handleChange = (event) => {
        if(checked){
            setChecked(false);
        }
        setEditFlightInfo(prev => ({ ...prev, [event.target.name]: event.target.value }));
        event.preventDefault();
    }

    // Handles the sumbit button and sends a POST request to the database
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById("editForm");
        Array.from(form.elements).forEach(input => {
            editFlightInfo.state[input.name] = input.value;
        })
        axios.put(`http://localhost:8085/${location.state._id}`, { ...editFlightInfo }
        );
        setChecked(true);
    }


    return (
        <>
            <StyledForm>
                <form id='editForm'>
                    <div>
                        <label>Flightsdasdr:
                            <input id="flightNumber" name='flightNumber' type="number" placeholder="Flight Number" defaultValue={editFlightInfo.state.flightNumber} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Departure Date:
                            <input id="departDate" name="departDate" type="text" placeholder="MM/DD/YYYY" defaultValue={editFlightInfo.state.departDate} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Arrival Date:
                            <input id="arriveDate" name="arriveDate" type="text" placeholder="MM/DD/YYYY" defaultValue={editFlightInfo.state.arriveDate} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Departure Time:
                            <input id="departTime" name="departTime" type="text" placeholder="HH:mm" defaultValue={editFlightInfo.state.departTime} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Arrival Time:
                            <input id="arriveTime" name="arriveTime" type="text" placeholder="HH:mm" defaultValue={editFlightInfo.state.arriveTime} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Departure Airport:
                            <input id="departAirport" name="departAirport" type="text" placeholder="Departure Airport" defaultValue={editFlightInfo.state.departAirport} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Arrival Airport:
                            <input id="arriveAirport" name="arriveAirport" type="text" placeholder="Arrival Airport" defaultValue={editFlightInfo.state.arriveAirport} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label >Number of Passengers:
                            <input id="numPassengers" name="numPassengers" type="number" placeholder="Number of Passengers" defaultValue={editFlightInfo.state.numPassengers} onChange={handleChange}></input>
                        </label></div>
                    <div>
                        <label>Passenger Limit:
                            <input id="passengerLimit" name="passengerLimit" type="number" placeholder="Passenger Limit" defaultValue={editFlightInfo.state.passengerLimit} onChange={handleChange}></input>
                        </label></div>

                    <input type="submit" onClick={handleSubmit} />
                </form>
            </StyledForm>
            {checked ? 
                <EditSuccess/>
                :
                <></>
        
            }
        </>
    )
}
