import axios from 'axios';
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { EditSuccess } from '../Snackbars';
import { TextField, Input } from '@mui/material';

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

    // Handles updating the text of each TextField field
    const handleChange = (event) => {
        setFlightInfo(prev => ({ ...prev, [event.target.name]: event.target.value }));
        event.preventDefault();

    }
    const [checked, setChecked] = useState(false);
    // Handles the sumbit button and sends a POST request to the database
    const handleSubmit = async(event) => {
        event.preventDefault();

        
         if(flightInfo.departDate.match(/^\d\d\/\d\d\/\d\d\d\d$/) && flightInfo.flightNumber.length <= 6 && flightInfo.arriveDate.match(/^\d\d\/\d\d\/\d\d\d\d$/) &&
        flightInfo.departTime.match(/^\d{0,1}\d:\d\d/) && flightInfo.arriveTime.match(/^\d{0,1}\d:\d\d/) && ((flightInfo.numPassengers - flightInfo.passengerLimit) <= 0)){
           await axios.post('http://localhost:8085/', {
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
            // Sets TextField fields back to default values
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
            setChecked(true);
        }
    }


    return (
        <>
            
                <form >
                <h2 style={{marginLeft: '50px'}}>Add Flight</h2>
                <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField  label="Flight Number" required name="flightNumber" error={!(flightInfo.flightNumber.length <= 6)|| flightInfo.flightNumber.length === 0} type="number" placeholder="Flight Number" value={flightInfo.flightNumber} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Departure Date" required error={!flightInfo.departDate.match(/^\d\d\/\d\d\/\d\d\d\d$/)} name="departDate" type="text" placeholder="MM/DD/YYYY" value={flightInfo.departDate} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField  label="Arrival Date" required name="arriveDate" error={!flightInfo.arriveDate.match(/^\d\d\/\d\d\/\d\d\d\d$/)} type="text" placeholder="MM/DD/YYYY" value={flightInfo.arriveDate} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Departure Time" required name="departTime" error={!flightInfo.departTime.match(/^\d{0,1}\d:\d\d/)} type="text" placeholder="HH:mm" value={flightInfo.departTime} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Arrival Time" required name="arriveTime" error={!flightInfo.arriveTime.match(/^\d{0,1}\d:\d\d/)} type="text" placeholder="HH:mm" value={flightInfo.arriveTime} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField  label="Departure Airport" required  error={!flightInfo.departAirport.match(/\b(?<![A-Z])[A-Z]{3}(?![A-Z]){3}\b/)} name="departAirport" type="text" placeholder="Departure Airport" value={flightInfo.departAirport} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Arrival Airport" required error={!flightInfo.departAirport.match(/\b(?<![A-Z])[A-Z]{3}(?![A-Z]){3}\b/)} name="arriveAirport" type="text" placeholder="Arrival Airport" value={flightInfo.arriveAirport} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Number of Passengers" required name="numPassengers" error={!((flightInfo.numPassengers - flightInfo.passengerLimit) <= 0)} type="number" placeholder="Number of Passengers" value={flightInfo.numPassengers} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Passenger Limit" required name="passengerLimit" type="number" placeholder="Passenger Limit" value={flightInfo.passengerLimit} onChange={handleChange}></TextField>
                    </div>
                    <Input type="submit" onClick={handleSubmit} />
                </form>
                {checked ?
                <EditSuccess />
                :
                <></>

            }
           
        </>
    )
}
/*<FormContext.Provider value={flightInfo}>
                        <h1>{flightInfo}</h1>
            </FormContext.Provider>
            */
export const EditForm1 = (flight) => {
    // useState for handling state changes to the page
    const location = useLocation([]);
    const [editFlightInfo, setEditFlightInfo] = useState(location.state);

    const [checked, setChecked] = useState(false);
 console.log(location)

    // Handles updating the text of each TextField field
    const handleChange = (event) => {
        if (checked) {
            setChecked(false);
        }
        setEditFlightInfo(prev => (
            { ...prev, [event.target.name]: event.target.value }));

        event.preventDefault();
    }



    // Handles the sumbit button and sends a POST request to the database
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = document.getElementById("editForm");
        Array.from(form.elements).forEach(TextField => {

            location.state[TextField.name] = TextField.value;


        })
        if(!editFlightInfo.departDate.match(/^\d\d\/\d\d\/\d\d\d\d$/)){
            console.log("Depart Date Invalid");
        }
        if(!( editFlightInfo.flightNumber.length <= 6)){
            console.log("Flight Number Invalid");
        }
        if(!(editFlightInfo.arriveDate.match(/^\d\d\/\d\d\/\d\d\d\d$/))){
            console.log("Arrival Date Invalid");
        }
        if(!(editFlightInfo.departTime.match(/^\d{0,1}\d:\d\d/))){
            console.log("Depart Time Invalid");
        }
        if(!(editFlightInfo.arriveTime.match(/^\d{0,1}\d:\d\d/))){
            console.log("Arrival Time Invalid");
        }
        if(!((editFlightInfo.numPassengers - editFlightInfo.passengerLimit) <= 0)){
            console.log("Number of passengers Invalid");
        }
        else if(editFlightInfo.departDate.match(/^\d\d\/\d\d\/\d\d\d\d$/) && editFlightInfo.flightNumber.length <= 6 && editFlightInfo.arriveDate.match(/^\d\d\/\d\d\/\d\d\d\d$/) &&
        editFlightInfo.departTime.match(/^\d{0,1}\d:\d\d/) && editFlightInfo.arriveTime.match(/^\d{0,1}\d:\d\d/) && ((editFlightInfo.numPassengers - editFlightInfo.passengerLimit) <= 0)) {
            axios.put(`http://localhost:8085/${location.state._id}`, { ...location } )
            setChecked(true);
        }
        

        
    }


    return (
        <>
           
                <form id='editForm' >
                    <h2 style={{marginLeft: '50px'}}>Edit Flight</h2>
                <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField  label="Flight Number" required name="flightNumber" error={!(editFlightInfo.flightNumber.length <= 6) || editFlightInfo.flightNumber.length === 0} type="number" placeholder="Flight Number" value={editFlightInfo.flightNumber} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Departure Date" required error={(!editFlightInfo.departDate.match(/^\d\d\/\d\d\/\d\d\d\d$/))} name="departDate" type="text" placeholder="MM/DD/YYYY" value={editFlightInfo.departDate} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField  label="Arrival Date" required name="arriveDate" error={!editFlightInfo.arriveDate.match(/^\d\d\/\d\d\/\d\d\d\d$/)} type="text" placeholder="MM/DD/YYYY" value={editFlightInfo.arriveDate} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Departure Time" required name="departTime" error={!editFlightInfo.departTime.match(/^\d{0,1}\d:\d\d/)} type="text" placeholder="HH:mm" value={editFlightInfo.departTime} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Arrival Time" required name="arriveTime" error={!editFlightInfo.arriveTime.match(/^\d{0,1}\d:\d\d/)} type="text" placeholder="HH:mm" value={editFlightInfo.arriveTime} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField  label="Departure Airport" required  error={!editFlightInfo.departAirport.match(/\b(?<![A-Z])[A-Z]{3}(?![A-Z]){3}\b/)} name="departAirport" type="text" placeholder="Departure Airport" value={editFlightInfo.departAirport} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Arrival Airport" required error={!editFlightInfo.departAirport.match(/\b(?<![A-Z])[A-Z]{3}(?![A-Z]){3}\b/)} name="arriveAirport" type="text" placeholder="Arrival Airport" value={editFlightInfo.arriveAirport} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Number of Passengers" required name="numPassengers" error={!((editFlightInfo.numPassengers - editFlightInfo.passengerLimit) <= 0)} type="number" placeholder="Number of Passengers" value={editFlightInfo.numPassengers} onChange={handleChange}></TextField>
                    </div>
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <TextField label="Passenger Limit" required name="passengerLimit" type="number" placeholder="Passenger Limit" value={editFlightInfo.passengerLimit} onChange={handleChange}></TextField>
                    </div>
                    <Input type="submit" onClick={handleSubmit} />
                </form>
            
            {checked ?
                <EditSuccess />
                :
                <></>

            }
        </>
    )
}
