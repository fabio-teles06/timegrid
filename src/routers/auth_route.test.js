const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const { prisma } = require('../db'); // Adjust the path to your db file

describe('POST /auth/register', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });
    it('should register a user with valid data', async () => {
        const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'Password12!@' };
        const response = await request(app).post('/auth/register').send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    })
    it('should register a user with invalid data', async () => {
        const mockUser = { id: 1, name: 'Joh23oe', email: 'johnmplecom', password: 'hashedpassword' };
        const response = await request(app).post('/auth/register').send(mockUser);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toContain('Invalid name format');
        expect(response.body.errors).toContain('Invalid email format');
        expect(response.body.errors).toContain('Invalid password format');
    });
    afterAll((done) => {
        prisma.user.deleteMany().then(() => {
            prisma.$disconnect().then(() => done());
        });
    });
});