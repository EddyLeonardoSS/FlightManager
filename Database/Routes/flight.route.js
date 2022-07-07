const router = require('express').Router();

const {createFlight, findFlightById, findAllFlights, deleteFlight, updateFlight} = require('../Controllers/flight.controller');


router.get('/flights', async (req, res) => {
   const flights = await findAllFlights();
   res.json(flights); 
});

router.get('/:id', async (req, res) => {
    try {
        
        const flight = await findFlightById(req.params.id);
        console.log("specific")
        res.json(flight);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});
router.get('/flights/:id', async (req, res) => {
    try {
        
        const flight = await findFlightById(req.params.id);
        console.log("specific")
        res.json(flight);
    } catch (err) {
        res.status(err?.status || 400).json(err);
    }
});

router.post('/', async (req, res) => {
    try{
        const flightId = await createFlight(req.body);
        res.status(201).json({_id: flightId});
    }
    catch(err){
        res.status(err?.status || 500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await deleteFlight(req.params.id);
        res.status(201).json({_id: flightId});
    }
    catch(err){
        res.status(err?.status || 500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const flightId = await updateFlight(req.params.id, req.body);
        res.status(201).json({_id: flightId});
    }
    catch(err){
        res.status(err?.status || 500).json(err);
    }
});



module.exports = router;