const express = require('express');
const router = express.Router();
const termsAndConditionsController = require('../controllers/termsConditions');

// @route GET /api/terms_and_conditions
// @desc Get all terms and conditions
router.get('/', termsAndConditionsController.getTermsAndConditions);

// @route GET /api/terms_and_conditions/:id
// @desc Get a single terms and conditions by ID
router.get('/:id', termsAndConditionsController.getTermsAndConditionsById);

// @route POST /api/terms_and_conditions
// @desc Create a new terms and conditions
router.post('/', termsAndConditionsController.createTermsAndConditions);

// @route PUT /api/terms_and_conditions/:id
// @desc Update terms and conditions by ID
router.put('/:id', termsAndConditionsController.updateTermsAndConditions);

// @route DELETE /api/terms_and_conditions/:id
// @desc Delete terms and conditions by ID
router.delete('/:id', termsAndConditionsController.deleteTermsAndConditions);

module.exports = router;
