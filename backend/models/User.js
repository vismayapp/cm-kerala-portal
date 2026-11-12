const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['citizen', 'cmo_admin', 'department_officer'], 
    default: 'citizen' 
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);