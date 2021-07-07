const express = require('express');
const db = require('../data/helpers/projectModel'); // Imports project helper functions

const router = express.Router();

// Returns All Projects
router.get('/', (req, res) => {
	// Helper function to get all projects
	db.get()
		.then((projects) => {
			res.status(200).json(projects)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The project information could not be retrieved.'
			})
		})
})

// Returns the project with the given id
router.get('/:id', (req, res) => {
	// Helper function to get the project with the given id
	db.get(req.params.id)
		.then(project => {
			res.status(200).json(project)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The project information could not be retrieved.'
			})
		})
})

// Creates a new Project
router.post('/', (req, res) => {
	// If the following fields are not completed then no project will be created
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			errorMessage: 'Please provide name and description for the project.'
		})
	}
	// Helper function that adds the new project into the database
	db.insert(req.body)
		.then((projectId) => {
			return db.get(projectId.id)
		})
		.then((project) => {
			res.status(201).json(project)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'There was an error while saving the project to the database'
			})
		})
})

// Updates a project with the given id
router.put('/:id', (req, res) => {
	// If the following fields are not completed the project will not be updated
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			errorMessage: 'Please provide name and description for the project.'
		})
	}
	// Helper function that updates a project with the given id with the new data
	db.update(req.params.id, req.body)
		.then((projectId) => {
			return db.get(projectId.id)
		})
		.then((project) => {
			if (project) {
				res.status(200).json(project)
			} else {
				res.status(404).json({
					message: 'The project with the specified ID does not exist.'
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errerrorMessage: 'The project information could not be modified.'
			})
		})
})

// Deletes the project with the given id
router.delete('/:id', (req, res) => {
	// Helper function that removes a project with the given id from the database
	db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: 'The project has been removed',
				})
			} else {
				res.status(404).json({
					message: 'The project with the specified ID does not exist.'
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The project could not be removed'
			})
		})
})

// Returns all of the actions of a project with the given id
router.get('/:id/actions', (req, res) => {
	// Helper function that retrieves all of the action for a project with the given id
	db.getProjectActions(req.params.id)
		.then(action => {
			res.status(200).json(action)
		})
		.catch(err => {
			res.status(500).json({
				message: 'There are no actions for this project'
			})
		})
})

module.exports = router;