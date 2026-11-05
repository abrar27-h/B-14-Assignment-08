import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axiosInstance from './api/axiosInstance';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Studios from './pages/Studios';
import StudioDetails from './pages/StudioDetails';
import AddStudio from './pages/AddStudio';
import MyListings from './pages/MyListings';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';
import HowItWorks from './pages/HowItWorks'; // ইম্পোর্ট করা হলো
import AboutUs from './pages/AboutUs';       // ইম্পোর্ট করা হলো
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  // পেজ লোড বা রিফ্রেশ হলে কুকি চেক করে ইউজার স্টেট সেট করা
  useEffect(() => {
    axiosInstance.get('/auth/current-user')
      .then(res => {
        if (res.data) {
          setUser(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">Loading StudioSpace...</div>;
  }

  return (
    <Router>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <Toaster position="top-center" />
        <Navbar user={user} setUser={setUser} theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/studios" element={<Studios user={user} />} />
          <Route path="/studios/:id" element={<StudioDetails user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/how-it-works" element={<HowItWorks user={user} />} />
          <Route path="/about-us" element={<AboutUs user={user} />} />
          <Route path="/add-studio" element={<AddStudio user={user} />} />
          <Route path="/my-listings" element={<MyListings user={user} />} />
          <Route path="/my-bookings" element={<MyBookings user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}