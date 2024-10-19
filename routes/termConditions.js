const express = require('express');
const router = express.Router();
const termsAndConditionsController = require('../controllers/termsConditions');


router.get('/', termsAndConditionsController.getTermsAndConditions);

router.get('/:id', termsAndConditionsController.getTermsAndConditionsById);

router.post('/', termsAndConditionsController.createTermsAndConditions);

router.put('/:id', termsAndConditionsController.updateTermsAndConditions);

router.delete('/:id', termsAndConditionsController.deleteTermsAndConditions);

module.exports = router;
