const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }, // e.g., PWD, HEALTH, REVENUE
  description: { type: String },
  headOfficerName: { type: String },
  contactEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);