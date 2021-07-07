const express = require('express');

const mainRouter = require('./main/main-router');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();

server.use(express.json());

server.use('/api/', mainRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
	res.send('The server is running locally!')
})

module.exports = server;