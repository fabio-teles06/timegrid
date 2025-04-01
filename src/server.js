const app = require('./app');
const prisma = require('./database');

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    prisma.$connect();
});