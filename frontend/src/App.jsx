import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, AboutUs, HowItWorks, DepartmentsList, ContactUs, FAQ } from './pages/PublicPages';
import SubmitGrievance from './pages/SubmitGrievance';
import Login from './pages/Login';
import CmoDashboard from './pages/CmoDashboard';

export default function App() {
  return (
    <Router>
      <nav className="bg-red-900 text-white p-4 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <Link to="/" className="font-bold text-lg">CMO Kerala Portal</Link>
          <div className="flex space-x-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/how-it-works" className="hover:underline">How It Works</Link>
            <Link to="/departments" className="hover:underline">Departments</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/faq" className="hover:underline">FAQ</Link>
            <Link to="/cmo/dashboard" className="hover:underline text-yellow-300 font-bold">CMO Dashboard</Link>
            <Link to="/login" className="bg-white text-red-900 px-3 py-1 rounded font-bold">Login</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/departments" element={<DepartmentsList />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/citizen/submit" element={<SubmitGrievance />} />
        <Route path="/cmo/dashboard" element={<CmoDashboard />} />
      </Routes>
    </Router>
  );
}