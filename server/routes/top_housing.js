const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const housing_controller = require('../controllers/housing_controller');

router.get('/', isAuthenticated, housing_controller.getTopHousing);

router.post('/', isAuthenticated, housing_controller.getProjectionResidences);

module.exports = router;
