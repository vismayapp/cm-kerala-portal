const mongoose = require('mongoose');

const grievanceHistorySchema = new mongoose.Schema({
  grievance: { type: mongoose.Schema.Types.ObjectId, ref: 'Grievance', required: true },
  status: { type: String, required: true },
  remarks: { type: String, required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('GrievanceHistory', grievanceHistorySchema);