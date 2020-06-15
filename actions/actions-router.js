const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/:id', (req, res) => {
	db.get(req.params.id)
		.then(actions => {
			res.status(200).json(actions)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				error: 'The actions information could not be retrieved.'
			})
		})
})

router.post('/', (req, res) => {
	if (!req.body.project_id  || !req.body.description || !req.body.completed) {
		return res.status(400).json({
			errorMessage: 'Please provide all necessary info.'
		})
	}

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
				error: 'There was an error while saving the action to the database'
			})
		})
})

router.put('/:id', (req, res) => {
	if (!req.body.project_id  || !req.body.description || !req.body.completed) {
		return res.status(400).json({
			errorMessage: 'Please provide all necessary info.'
		})
	}
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
				error: 'The action information could not be modified.'
			})
		})
})

router.delete('/:id', (req, res) => {
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
				error: 'The action could not be removed'
			})
		})
})

module.exports = router;