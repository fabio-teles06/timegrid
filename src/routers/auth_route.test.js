const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const { prisma } = require('../db'); // Adjust the path to your db file

const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'Password12!@' };

describe('POST /auth/register', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });
    it('should register a user with valid data', async () => {
        const response = await request(app).post('/auth/register').send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    })
    it('should register a user with invalid data', async () => {
        const invalidUser = { ...mockUser, name: 'Joh4n', email: 'johnexample.com', password: 'pass' };
        const response = await request(app).post('/auth/register').send(invalidUser);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toContain('Invalid name format');
        expect(response.body.errors).toContain('Invalid email format');
        expect(response.body.errors).toContain('Invalid password format');
    })
    it('should return 409 if user already exists', async () => {
        const response = await request(app).post('/auth/register').send(mockUser);

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('error', 'User already exists');
    })
    it('should return 500 if registration fails', async () => {
        jest.spyOn(prisma.user, 'create').mockImplementationOnce(() => {
            throw new Error('Database error');
        });
        const response = await request(app).post('/auth/register').send(mockUser);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Internal server error');
        jest.restoreAllMocks();
    })
    it('should return 200 if login is successful', async () => {
        const response = await request(app).post('/auth/login').send({
            email: mockUser.email,
            password: mockUser.password,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    })
    it('should return 401 if user does not exist', async () => {
        const response = await request(app).post('/auth/login').send({
            email: "not-user@test.com",
            password: "notpassword",
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid credentials');
    })
    it('should return 401 with wrong password', async () => {
        const response = await request(app).post('/auth/login').send({
            email: mockUser.email,
            password: 'wrongpassword',
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid credentials');
    })
    afterAll((done) => {
        prisma.user.delete({ where: { email: 'john@example.com' } }).then(() => {
            done();
        });
    });
});