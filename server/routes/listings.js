const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './images/listings' });
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', isAuthenticated, listings_controller.retrieve_theme_listings)

router.get('/:id', isAuthenticated, listings_controller.getSingleListing);

router.post('/', isAuthenticated, upload.single('image'), listings_controller.add_listing);

router.put('/:id', isAuthenticated, upload.single('image'), listings_controller.updateListing);

router.delete('/:id', isAuthenticated, listings_controller.deleteListing);

module.exports = router;
