const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  referenceId: { type: String, required: true, unique: true }, // e.g., CMO-2026-84920
  citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  district: { type: String, required: true },
  
  // AI-Populated & Admin-Editable Fields
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  aiSuggestedDepartment: { type: String },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  aiSummary: { type: String },

  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Forwarded to Department', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Submitted'
  },
  attachmentUrl: { type: String, default: null },
  actionReportUrl: { type: String, default: null },
  assignedOfficer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  dueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Grievance', grievanceSchema);