const express = require('express');
const schemesController = require('../controllers/SchemesController')
const router = express.Router();
router.get('/getById/:id', schemesController.schemeById);
router.get('/getSchemesByType/:type', schemesController.schemesByType);
module.exports = router;