const Department = require('../models/Department');
const ContactEnquiry = require('../models/ContactEnquiry');

const getDepartments = async (req, res) => {
  const departments = await Department.find().sort({ name: 1 });
  res.json(departments);
};

const seedDepartments = async (req, res) => {
  const defaultDepts = [
    { name: 'Public Works (PWD)', code: 'PWD', description: 'Roads, bridges, and public buildings' },
    { name: 'Health & Family Welfare', code: 'HEALTH', description: 'Government hospitals and public health' },
    { name: 'Revenue & Disaster Management', code: 'REV', description: 'Land records, certificates, and relief' },
    { name: 'Electricity (KSEB)', code: 'KSEB', description: 'Power supply and electrical infrastructure' },
    { name: 'Water Authority (KWA)', code: 'KWA', description: 'Drinking water supply and sewerage' },
    { name: 'Local Self Government (LSGD)', code: 'LSGD', description: 'Panchayats, Municipalities, and Corporations' }
  ];
  await Department.insertMany(defaultDepts, { ordered: false }).catch(() => {});
  res.json({ message: 'Departments seeded' });
};

const submitContactEnquiry = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const enquiry = await ContactEnquiry.create({ name, email, subject, message });
  res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
};

module.exports = { getDepartments, seedDepartments, submitContactEnquiry };