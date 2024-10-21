const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {
    // ทดสอบ GET /products
    describe('GET /products', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/products');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(expect.arrayContaining([
                expect.objectContaining({ id: 1, name: 'Laptop', price: 1000, stock: 5 }),
                expect.objectContaining({ id: 2, name: 'Smartphone', price: 600, stock: 10 }),
            ]));
        });
    });

    // ทดสอบ GET /products/:id
    describe('GET /products/:id', () => {
        it('should return a product by ID', async () => {
            const res = await request(app).get('/products/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', 'Laptop');
        });

        it('should return 404 if product not found', async () => {
            const res = await request(app).get('/products/999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

    // ทดสอบ POST /products
    describe('POST /products', () => {
        it('should create a new product', async () => {
            const newProduct = { name: 'Tablet', price: 300, stock: 15 };
            const res = await request(app).post('/products').send(newProduct);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('name', 'Tablet');
            expect(res.body).toHaveProperty('price', 300);
            expect(res.body).toHaveProperty('stock', 15);
        });
    });

    // ทดสอบ PUT /products/:id
    describe('PUT /products/:id', () => {
        it('should update a product by ID', async () => {
            const updatedProduct = { name: 'Updated Laptop', price: 900, stock: 10 };
            const res = await request(app).put('/products/1').send(updatedProduct);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', 'Updated Laptop');
        });

        it('should return 404 if product not found', async () => {
            const res = await request(app).put('/products/999').send({ name: 'Non-existent Product' });
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });

    // ทดสอบ DELETE /products/:id
    describe('DELETE /products/:id', () => {
        it('should delete a product by ID', async () => {
            const res = await request(app).delete('/products/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'Product deleted');
        });

        it('should return 404 if product not found', async () => {
            const res = await request(app).delete('/products/999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Product not found');
        });
    });
});

