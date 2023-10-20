const express = require('express');
const itemsRouter = express.Router();
const logsArray = require('../models/data');


itemsRouter.get('/', (req, res) => {
    res.send(logsArray);
});








module.exports = itemsRouter