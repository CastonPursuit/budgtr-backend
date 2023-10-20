const server = require('./app');
const port = process.env.PORT || 3000;

require('dotenv').config()


server.get('/', (req, res) => {
    res.send('Hello, World!');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
