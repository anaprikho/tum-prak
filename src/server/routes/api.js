const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// API routes
router.get('/html', apiController.serveHTML);
router.put('/html', apiController.receiveHTML);
router.post('/submit-data', apiController.onSubmit);
router.get('/clear', apiController.clear);

module.exports = router;
