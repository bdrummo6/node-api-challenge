
const express = require('express');

const port = process.env.PORT || 8000;

const server = express();

server.use(express.json());

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
});