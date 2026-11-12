const express = require('express');
const router = express.Router();
const { getDepartments, seedDepartments, submitContactEnquiry } = require('../controllers/publicController');

router.get('/departments', getDepartments);
router.post('/departments/seed', seedDepartments);
router.post('/contact', submitContactEnquiry);

module.exports = router;