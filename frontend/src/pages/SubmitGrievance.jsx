import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function SubmitGrievance() {
  const [formData, setFormData] = useState({
    subject: '',
    department: 'General Administration',
    description: '',
    district: 'Kannur',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('subject', formData.subject);
    data.append('department', formData.department);
    data.append('description', formData.description);
    data.append('district', formData.district);
    if (file) data.append('attachment', file);

    try {
      const res = await API.post('/grievances', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`Grievance Submitted! Reference ID: ${res.data.referenceId || res.data.grievance?._id}`);
      navigate('/citizen/dashboard');
    } catch (err) {
      console.error('Submission error:', err.response || err);
      const serverMsg = err.response?.data?.message || err.message || 'Error submitting grievance';
      alert(`Failed: ${serverMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-red-900 mb-6">File a Public Grievance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Subject / Issue Summary</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Department</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="General Administration">General Administration (Auto-Detect via AI)</option>
            <option value="Water Authority">Kerala Water Authority (KWA)</option>
            <option value="KSEB">Kerala State Electricity Board (KSEB)</option>
            <option value="Public Works">Public Works Department (PWD)</option>
            <option value="Revenue">Revenue Department</option>
            <option value="Health">Health and Family Welfare</option>
            <option value="Police">Home / Police Department</option>
            <option value="Local Self Government">Local Self Government (LSGD)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">District</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          >
            <option value="Kannur">Kannur</option>
            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
            <option value="Ernakulam">Ernakulam</option>
            <option value="Kozhikode">Kozhikode</option>
            <option value="Kollam">Kollam</option>
            <option value="Thrissur">Thrissur</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Detailed Description</label>
          <textarea
            rows="4"
            className="w-full border p-2 rounded mt-1"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Attach Supporting Document / Photo (Max 5MB)</label>
          <input
            type="file"
            className="w-full border p-2 rounded mt-1"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-800 text-white p-3 rounded font-bold hover:bg-red-900"
        >
          {loading ? 'Analyzing with AI & Submitting...' : 'Submit Grievance'}
        </button>
      </form>
    </div>
  );
}