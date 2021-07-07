const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the API for the Node API Challenge!'
	})
})

module.exports = router;