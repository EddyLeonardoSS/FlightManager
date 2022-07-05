
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Flight, SearchFlights } from './Components/FlightList';
import { AppNav } from './Features';



import { Flights, Landing } from './Pages'

const App = () => {
    return (
       

        <BrowserRouter>
            <AppNav/>
            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/flights" element={<Flights />}></Route>
                <Route path="/flights/:id" element={<Flight />}></Route>
                <Route path="/searchFlights" element={<SearchFlights />}></Route>
            </Routes>
        </BrowserRouter>


    )

}

export default App;