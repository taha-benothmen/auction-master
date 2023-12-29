const express = require('express');
const router = express.Router();
const {
  getAllThemes,
  getTopThemes,
  createThemes,
} = require('../controllers/themes_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

// router.get('/', getAllThemes);
router.get('/top', isAuthenticated, getTopThemes);

// Route for creating a new theme
router.post('/create', async (req, res) => {
  try {
    const { themeName } = req.body;
    await createThemes(themeName);
    res.status(201).json({ message: 'Theme created successfully', theme: themeName });
  } catch (error) {
    res.status(500).json({ message: 'Error creating theme' });
  }
});

module.exports = router;
