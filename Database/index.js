const express = require('express');
const mongoose = require('mongoose');
const logger = require('./Middleware/logger');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(logger);
app.use(cors());

const flightRouter = require('./Routes/flight.route');

app.use('/', flightRouter);
app.use('/:id', flightRouter);

app.connect('*', (req,res) => {
    res.status(404).send('404 Not Found');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to Database');
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})