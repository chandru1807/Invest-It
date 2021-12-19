const express = require('express');
const mutualFundsController = require('../controllers/MutualFundsController')
const router = express.Router();
router.get('/getFundTypes', mutualFundsController.getAllFundTypes);
router.get('/getFundTypesWithSubtypes', mutualFundsController.getAllTypesWithSubTypes);
router.get('/getSchemesBySubType/:subtypeid', mutualFundsController.getSchemesBySubType);
module.exports = router;