const express = require('express');
const app = express();
const cors = require('cors');
const itemsController = require('./controllers/itemsController.js');

app.use(cors())
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welome to our home');
});

app.use('/items', itemsController);

app.get('*', (req, res) => {
    res.status(404).json({error: "invalid request"});
});

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something went wrong!'); 
});



module.exports = app;
