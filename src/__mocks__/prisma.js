const { mockDeep, mockReset } = require('jest-mock-extended');
const prisma = mockDeep();

beforeEach(() => {
    mockReset(prisma);
    prisma.session = {
        findUnique: jest.fn().mockResolvedValue(null),
        upsert: jest.fn().mockResolvedValue({ id: 'mocked-session-id' }),
        deleteMany: jest.fn(),
    }

})

module.exports = prisma;