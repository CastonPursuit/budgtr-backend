const express = require('express');
const itemsRouter = express.Router();
const itemsArray = require('../models/data');

itemsRouter.use(express.json())

// GET all items
itemsRouter.get('/', async (req, res, next) => {
    try {
        if (itemsArray && itemsArray.length > 0) {
            res.send(itemsArray);
        } else {
            res.status(404).send({ message: 'No items found' });
        }
    } catch (err) {
        next(err);
    }
});

// GET an item by ID
itemsRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = itemsArray.find(item => item.id === parseInt(id));

        if (item) {
            res.send(item);
        } else {
            res.status(404).send({ message: 'Item not found' });
        }
    } catch (err) {
        next(err);
    }
});


// POST an item to the server
itemsRouter.post('/', (req, res) => {
    
    try {
        const itemToPost = req.body;

        if(!itemToPost){
            res.status(404).send({ message: 'Invalid item data' });
        }

        itemsArray.push(itemToPost);
        res.status(201).send(itemToPost);
    } catch (err) {

        next(err);
    }

});

itemsRouter.put('/:id', (req, res, next) => {
    try {
        const itemId = parseInt(req.params.id);
        const updatedItem = req.body;

        const itemIndex = itemsArray.findIndex(item => item.id === itemId);

        if (itemIndex === -1) {
            return res.status(404).send({ message: 'Item not found' });
        }

        const currentItem = itemsArray[itemIndex];

        for (let key in updatedItem) {
            if (currentItem.hasOwnProperty(key)) {
                currentItem[key] = updatedItem[key];
            }
        }

        itemsArray[itemIndex] = currentItem;

        res.send(currentItem);
    } catch (error) {
        next(error);
    }
});


// DELETE an item by ID
itemsRouter.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const itemIndex = itemsArray.findIndex(item => item.id === id);

        if (itemIndex === -1) {
            return res.status(404).send({ message: 'Item not found' });
        }

        const deletedItem = itemsArray.splice(itemIndex, 1); 
        
        res.send(deletedItem[0]);

    } catch (error) {
        next(error);
    }
});






module.exports = itemsRouter