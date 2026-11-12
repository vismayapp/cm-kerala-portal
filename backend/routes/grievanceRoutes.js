const express = require('express');
const router = express.Router();
const grievanceController = require('../controllers/grievanceController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Submit a new grievance (Protected + File Upload)
router.post('/', protect, upload.single('attachment'), grievanceController.createGrievance);

// Get citizen's own grievances (supports either getMyGrievances or getUserGrievances)
const getMyHandler = grievanceController.getMyGrievances || grievanceController.getUserGrievances;
if (getMyHandler) {
  router.get('/my', protect, getMyHandler);
}

// Get all grievances (supports either getAllGrievances or getGrievances)
const getAllHandler = grievanceController.getAllGrievances || grievanceController.getGrievances;
if (getAllHandler) {
  router.get('/', protect, getAllHandler);
}

// Update grievance status (supports either updateGrievanceStatus or updateGrievance)
const updateHandler = grievanceController.updateGrievanceStatus || grievanceController.updateGrievance;
if (updateHandler) {
  router.put('/:id', protect, updateHandler);
}

module.exports = router;