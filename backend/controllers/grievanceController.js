const Grievance = require('../models/Grievance');
const { analyzeGrievance } = require('../services/aiService');

exports.createGrievance = async (req, res) => {
  try {
    // Fallback if auth middleware didn't attach user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized, please log in again.' });
    }

    const { subject, title, department, district, description } = req.body;
    const grievanceTitle = subject || title;

    if (!grievanceTitle || !description) {
      return res.status(400).json({ message: 'Subject and description are required' });
    }

    // Safely run AI analysis
    let aiAnalysis = { department: 'General Administration', priority: 'Medium', summary: description };
    try {
      aiAnalysis = await analyzeGrievance(grievanceTitle, description);
    } catch (aiErr) {
      console.warn('AI analysis skipped/failed:', aiErr.message);
    }

    const referenceId = `CMO-${Date.now().toString().slice(-6)}`;

    const grievance = await Grievance.create({
      user: req.user._id,
      referenceId,
      subject: grievanceTitle,
      title: grievanceTitle,
      department: department && department !== 'General Administration'
        ? department
        : aiAnalysis.department || 'General Administration',
      district: district || 'Kannur',
      description,
      priority: aiAnalysis.priority || 'Medium',
      aiSummary: aiAnalysis.summary || description,
      attachment: req.file ? req.file.path : null,
      status: 'Submitted',
    });

    res.status(201).json({
      message: 'Grievance submitted successfully',
      referenceId: grievance.referenceId,
      grievance,
    });
  } catch (error) {
    console.error('Create Grievance 500 Error:', error);
    res.status(500).json({ message: error.message || 'Server error during submission' });
  }
};