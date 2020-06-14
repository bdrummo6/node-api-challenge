
const express = require('express');
const mainRouter = require('./main/main-router.js')

const port = process.env.PORT || 8000;

const server = express();

server.use(express.json());

server.use(mainRouter);

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
});