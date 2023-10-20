const request = require('supertest');
const app = require('../app'); 
const itemsArray = require('../models/data'); 


describe('GET /items', () => {
    it('should return the itemsArray', async () => {
        const response = await request(app).get('/items');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(itemsArray);
    });
});


describe('GET /items/:id', () => {
    it('should return the specific item by ID', async () => {
        
        const itemId = itemsArray[0].id;
        const response = await request(app).get(`/items/${itemId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(itemsArray.find(item => item.id === itemId));

    });

    it('should return a 404 if the item is not found', async () => {
        const nonExistentId = 999999; 
        const response = await request(app).get(`/items/${nonExistentId}`);

        expect(response.status).toBe(404);
    });
});

describe('POST /items', () => {
    it('should create a new item and return it', async () => {
        const newItem = {
            id: 12345,
            item_name: "sample item",
            amount: 500,
            date: '2023-10-25',
            from: "John",
            category: 'sample category'
        };

        const response = await request(app).post('/items').send(newItem);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newItem);
    });
});

describe('PUT /items/:id', () => {
    it('should update an existing item and return it', async () => {
        const itemId = itemsArray[0].id;
        const updatedItem = {
            ...itemsArray[0],
            item_name: "updated item"
        };

        const response = await request(app).put(`/items/${itemId}`).send(updatedItem);

        expect(response.status).toBe(200);
        expect(response.body.item_name).toEqual("updated item");
    });
});

describe('DELETE /items/:id', () => {
    it('should delete an existing item', async () => {
        const itemId = itemsArray[0].id;

        const response = await request(app).delete(`/items/${itemId}`);

        expect(response.status).toBe(200);
        expect(itemsArray.some(item => item.id === itemId)).toBeFalsy();
    });
});