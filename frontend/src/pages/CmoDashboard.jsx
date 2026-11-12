import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function CmoDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, overdue: 0 });
  const [grievances, setGrievances] = useState([]);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [forwardData, setForwardData] = useState({ departmentId: '', priority: 'Medium', remarks: '' });

  const fetchData = async () => {
    try {
      const statsRes = await API.get('/grievances/stats/kpi');
      setStats(statsRes.data);
      const grievRes = await API.get('/grievances');
      setGrievances(grievRes.data);
      const deptRes = await API.get('/public/departments');
      setDepartments(deptRes.data);
    } catch (err) {}
  };

  useEffect(() => { fetchData(); }, []);

  const handleForward = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/grievances/${selectedGrievance._id}/assign`, forwardData);
      alert('Grievance forwarded successfully!');
      setSelectedGrievance(null);
      fetchData();
    } catch (err) {
      alert('Error forwarding grievance');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold text-red-900">Chief Minister's Office (CMO) Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border"><p className="text-sm text-gray-500">Total Grievances</p><h3 className="text-3xl font-bold text-gray-900">{stats.total}</h3></div>
        <div className="bg-white p-6 rounded-xl shadow border"><p className="text-sm text-gray-500">Pending Review</p><h3 className="text-3xl font-bold text-amber-600">{stats.pending}</h3></div>
        <div className="bg-white p-6 rounded-xl shadow border"><p className="text-sm text-gray-500">Resolved</p><h3 className="text-3xl font-bold text-green-700">{stats.resolved}</h3></div>
        <div className="bg-white p-6 rounded-xl shadow border"><p className="text-sm text-gray-500">Overdue (SLA Breach)</p><h3 className="text-3xl font-bold text-red-800">{stats.overdue}</h3></div>
      </div>

      {/* Grievances Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-4 bg-red-900 text-white font-bold">All Citizen Grievances</div>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">Ref ID</th>
              <th className="p-3">Citizen</th>
              <th className="p-3">Subject</th>
              <th className="p-3">District</th>
              <th className="p-3">AI Department</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map(g => (
              <tr key={g._id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-red-900">{g.referenceId}</td>
                <td className="p-3">{g.citizen?.name}</td>
                <td className="p-3 font-medium">{g.subject}</td>
                <td className="p-3">{g.district}</td>
                <td className="p-3">{g.aiSuggestedDepartment}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${g.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}>{g.priority}</span></td>
                <td className="p-3">{g.status}</td>
                <td className="p-3">
                  <button onClick={() => setSelectedGrievance(g)} className="bg-red-800 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-900">
                    Forward
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Forward Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full space-y-4">
            <h3 className="text-xl font-bold text-red-900">Forward Grievance: {selectedGrievance.referenceId}</h3>
            <p className="text-sm text-gray-600 bg-slate-50 p-3 rounded"><strong>AI Summary:</strong> {selectedGrievance.aiSummary}</p>
            <form onSubmit={handleForward} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Select Department</label>
                <select className="w-full border p-2 rounded mt-1" required
                  onChange={e => setForwardData({...forwardData, departmentId: e.target.value})}>
                  <option value="">Choose department...</option>
                  {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select className="w-full border p-2 rounded mt-1" value={forwardData.priority}
                  onChange={e => setForwardData({...forwardData, priority: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Administrative Remarks</label>
                <textarea rows="3" className="w-full border p-2 rounded mt-1" placeholder="Enter forwarding instructions..." required
                  onChange={e => setForwardData({...forwardData, remarks: e.target.value})}></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setSelectedGrievance(null)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-800 text-white rounded font-bold">Forward to Department</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}