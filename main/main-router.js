const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API for the Sprint Challenge!',
	})
})

module.exports = router;