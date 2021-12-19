const express = require('express');
const dataLoaderController = require('../controllers/DataLoaderController')
const router = express.Router();
router.get('/list', dataLoaderController.fetchMfList);
router.get('/getCodes', dataLoaderController.getCodes);
module.exports = router;