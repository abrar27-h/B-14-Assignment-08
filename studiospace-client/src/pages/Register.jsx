import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      const userData = { name: name || 'User', email, password, photoURL };
      const res = await axiosInstance.post('/auth/register', userData);
      
      toast.success('Registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border space-y-4 shadow-sm">
        <div>
          <label className="block text-xs font-medium mb-1">Name</label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Enter your name" 
            className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Profile Image URL</label>
          <input 
            type="url" 
            value={photoURL} 
            onChange={e => setPhotoURL(e.target.value)} 
            placeholder="Enter profile image URL" 
            className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none" 
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Password (min 6 characters)</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Enter password" 
            className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90"
        >
          Register
        </button>
        <p className="text-xs text-center text-gray-500">
          Already have an account? <Link to="/login" className="underline font-bold text-black dark:text-white">Login</Link>
        </p>
      </form>
    </div>
  );
}