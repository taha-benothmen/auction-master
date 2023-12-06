// routes.js
const express = require('express');
const usersshow_controller = require('../controllers/usersshow_controller');
const db = require('../mysql/mysql');
const { isAuthenticated } = require('../middleware/auth_middleware');
const express = require('express');
const router = express.Router();
const middleware = require('./middleware');

// Get all users
router.get('/users', middleware.getUsers);

// Get a specific user by username
router.get('/users/:username', middleware.getUser);

// Delete a user by username
router.delete('/users/:username', middleware.deleteUser);

// Edit user details
router.put('/users/:username', middleware.editUser);

module.exports = router;
