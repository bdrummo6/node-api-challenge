const express = require('express');
const db = require('../data/helpers/actionModel'); // Imports action helper functions

const router = express.Router();

// Returns all of the actions regardless of project association
router.get('/', (req, res) => {
	// Helper function to get all actions
	db.get() 
		.then(actions => {
			res.status(200).json(actions)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The action information could not be retrieved.'
			})
		})
})

// Returns all of the actions of a project with the given id
router.get('/:id', (req, res) => {
	// Helper function to get the action with the given id
	db.get(req.params.id) 
		.then(actions => {
			res.status(200).json(actions)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The actions information could not be retrieved.'
			})
		})
})

// Creates an action for a project
router.post('/', (req, res) => {
	// If the following fields are not completed then no action will be created
	if (!req.body.project_id  || !req.body.description || !req.body.notes) {
		return res.status(400).json({
			errorMessage: 'Please provide the project id, description and notes for the action.'
		})
	}
	// Helper function that adds the new action into the database
	db.insert(req.body)
		.then((projectId) => {
			return db.get(projectId.id)
		})
		.then((action) => {
			res.status(201).json(action)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'There was an error while saving the action to the database'
			})
		})
})

// Updates an action with the given id
router.put('/:id', (req, res) => {
	// If the following fields are not completed the action will not be updated
	if (!req.body.description || !req.body.notes) {
		return res.status(400).json({
			errorMessage: 'Please provide the description and notes for the action.'
		})
	}
	// Helper function that updates an action with the given id with the new data
	db.update(req.params.id, req.body)
		.then((projectId) => {
			return db.get(projectId.id)
		})
		.then((action) => {
			if (action) {
				res.status(200).json(action)
			} else {
				res.status(404).json({
					message: 'The action with the specified ID does not exist.'
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The action information could not be modified.'
			})
		})
})

// Deletes an action with the given id
router.delete('/:id', (req, res) => {
	// Helper function that removes an action with the given id from the database
	db.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: 'The action has been removed',
				})
			} else {
				res.status(404).json({
					message: 'The action with the specified ID does not exist.'
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The action could not be removed'
			})
		})
})

module.exports = router;