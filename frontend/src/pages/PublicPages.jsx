import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { ShieldCheck, FileText, Search, Building2, PhoneCall, HelpCircle, CheckCircle2 } from 'lucide-react';

export function Home() {
  const [searchRef, setSearchRef] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/grievances/track/${searchRef}`);
      setTrackResult(res.data);
    } catch (err) {
      alert('Reference ID not found');
      setTrackResult(null);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-red-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Chief Minister's Public Grievance Redressal Portal
          </h1>
          <p className="text-lg text-red-100">
            A direct digital bridge between the citizens of Kerala and the Chief Minister's Office for transparent issue resolution.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/citizen/submit" className="bg-white text-red-900 px-6 py-3 rounded-lg font-bold hover:bg-red-50">
              File a Grievance
            </Link>
            <Link to="/how-it-works" className="border border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-red-800">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Track Widget */}
      <section className="max-w-2xl mx-auto px-4 -mt-20">
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-red-800" /> Track Your Grievance Instantly
          </h3>
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Reference ID (e.g., CMO-2026-48291)"
              className="flex-1 border p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              required
            />
            <button type="submit" className="bg-red-800 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-900">
              Track
            </button>
          </form>

          {trackResult && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border text-sm space-y-2">
              <p><strong>Subject:</strong> {trackResult.grievance.subject}</p>
              <p><strong>Status:</strong> <span className="text-red-800 font-bold">{trackResult.grievance.status}</span></p>
              <p><strong>Assigned Dept:</strong> {trackResult.grievance.department?.name || 'Pending CMO Assignment'}</p>
              <Link to={`/track/${trackResult.grievance.referenceId}`} className="text-red-800 font-bold underline block mt-1">
                View Full Timeline History →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Statistics / Sample Metrics */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border text-center">
          <h4 className="text-3xl font-extrabold text-red-900">14,850+</h4>
          <p className="text-gray-600 text-sm mt-1">Grievances Registered</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border text-center">
          <h4 className="text-3xl font-extrabold text-green-700">13,200+</h4>
          <p className="text-gray-600 text-sm mt-1">Successfully Resolved</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border text-center">
          <h4 className="text-3xl font-extrabold text-blue-800">92.4%</h4>
          <p className="text-gray-600 text-sm mt-1">SLA Compliance Rate</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border text-center">
          <h4 className="text-3xl font-extrabold text-purple-800">15 Days</h4>
          <p className="text-gray-600 text-sm mt-1">Target Resolution SLA</p>
        </div>
      </section>
    </div>
  );
}

export function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-3xl font-bold text-red-900">About the Grievance Initiative</h2>
      <p className="text-gray-700 leading-relaxed">
        The Chief Minister's Public Grievance Redressal Portal represents a transformative governance initiative aimed at bringing administrative transparency and accountability across Kerala. 
      </p>
      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-bold text-lg text-red-800 mb-2">Our Vision</h3>
          <p className="text-sm text-gray-600">A responsive, corruption-free public administration system where every citizen's voice is heard and acted upon within stipulated timelines.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-bold text-lg text-red-800 mb-2">Our Mission</h3>
          <p className="text-sm text-gray-600">Leveraging AI-powered triage and structured workflow automation to route, monitor, and resolve citizen grievances with zero bureaucratic bottlenecks.</p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    { title: '1. Citizen Submission', desc: 'Citizen submits a grievance with description and supporting documents.' },
    { title: '2. AI Triage & Review', desc: 'System automatically classifies department, priority, and generates a CMO brief.' },
    { title: '3. CMO Assignment', desc: 'CMO administrators review and forward the complaint to the concerned department.' },
    { title: '4. Officer Action', desc: 'Department officers investigate, update progress, and upload action-taken reports.' },
    { title: '5. Resolution & Feedback', desc: 'Citizen receives final update and submits feedback upon resolution.' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h2 className="text-3xl font-bold text-red-900 text-center">Mandatory Grievance Workflow</h2>
      <div className="space-y-4">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow border flex items-start gap-4">
            <div className="bg-red-900 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{s.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DepartmentsList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get('/public/departments').then(res => setDepartments(res.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-3xl font-bold text-red-900">Government Departments</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {departments.map(d => (
          <div key={d._id} className="bg-white p-6 rounded-xl shadow border space-y-2">
            <h3 className="font-bold text-lg text-gray-900">{d.name}</h3>
            <p className="text-xs font-semibold text-red-800 bg-red-50 inline-block px-2 py-1 rounded">Code: {d.code}</p>
            <p className="text-sm text-gray-600">{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/public/contact', form);
      alert('Enquiry submitted successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert('Error submitting enquiry');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 bg-white shadow rounded-xl border mt-8">
      <h2 className="text-2xl font-bold text-red-900 mb-6">Contact the CMO Support Team</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-2.5 rounded" required
          value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email Address" className="w-full border p-2.5 rounded" required
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input type="text" placeholder="Subject" className="w-full border p-2.5 rounded" required
          value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
        <textarea rows="4" placeholder="Your Message" className="w-full border p-2.5 rounded" required
          value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
        <button type="submit" className="w-full bg-red-800 text-white p-3 rounded font-bold hover:bg-red-900">Send Enquiry</button>
      </form>
    </div>
  );
}

export function FAQ() {
  const faqs = [
    { q: 'How do I track my grievance?', a: 'Use your unique Reference ID (e.g., CMO-2026-XXXXX) on the home page tracking widget or track page.' },
    { q: 'What is the standard SLA for resolution?', a: 'The target resolution SLA is 15 days from the date of submission.' },
    { q: 'Can I attach supporting documents?', a: 'Yes, supporting images or documents up to 5MB can be attached during grievance submission.' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-3xl font-bold text-red-900">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow border">
            <h4 className="font-bold text-gray-900">{f.q}</h4>
            <p className="text-sm text-gray-600 mt-2">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}