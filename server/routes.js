const express = require('express');
const router = express.Router();
const { predictSkinCancer } = require('./controller');

// POST request to predict skin cancer
router.post('/predict', predictSkinCancer);

module.exports = router;

