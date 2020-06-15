
const express = require('express');

const mainRouter = require('./main/main-router.js');
const projectRouter = require('./projects/projects-router');

const port = process.env.PORT || 8000;

const server = express();

server.use(express.json());

server.use(mainRouter);
server.use(projectRouter);

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
});