
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {  SearchFlights } from './Components/FlightList';
import { AppNav } from './Features';


import { Flights, Landing } from './Pages'

const App = () => {
    return (
       
        <BrowserRouter>
            <AppNav/>
            <Routes>
                <Route path="/" element={<Flights />}></Route>
                <Route path="/flights" element={<Flights />}></Route>
                <Route path="/searchFlights" element={<SearchFlights />}></Route>
            </Routes>
        </BrowserRouter>

        

    )

}

export default App;