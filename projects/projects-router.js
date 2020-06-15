const express = require('express');
const db = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
	db.get()
		.then((projects) => {
			res.status(200).json(projects)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: 'The project information could not be retrieved.'
			})
		})
})

router.get('/:id', (req, res) => {
	db.get(req.params.id)
		.then(project => {
			res.status(200).json(project)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: 'The project information could not be retrieved.'
			})
		})
})

router.post('/', (req, res) => {
	if (!req.body.name || !req.body.description || !req.body.completed) {
		return res.status(400).json({
			errorMessage: 'Please provide name and description for the project.'
		})
	}

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
				error: 'There was an error while saving the project to the database'
			})
		})
})

router.put('/:id', (req, res) => {
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			errorMessage: 'Please provide name and description for the project.'
		})
	}

	db.update(req.params.id, req.body)
		.then((projectId) => {
			return db.findById(projectId.id)
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
				error: 'The project information could not be modified.'
			})
		})
})

router.delete('/:id', (req, res) => {
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
				error: 'The project could not be removed'
			})
		})
})

router.get('/:id/actions', (req, res) => {
	db.getProjectActions(req.params.id)
		.then(action => {
			res.status(200).json(action)
		})
		.catch(err => {
			res.status(500).json({
				Message: 'There are no actions for this project'
			})
		})
})

module.exports = router;