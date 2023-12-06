const express = require('express');
const router = express.Router();
const {
  getAllSchools,
  getTopSchools,
  createSchools,
} = require('../controllers/schools_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', getAllSchools);
router.get('/top', isAuthenticated, getTopSchools);

// Route for creating a new school
router.post('/create', async (req, res) => {
  try {
    const { schoolName } = req.body;
     await createSchools(schoolName);
    res.status(201).json({ message: 'School created successfully', school: schoolName });
  } catch (error) {
    res.status(500).json({ message: 'Error creating school' });
  }
});

module.exports = router;
