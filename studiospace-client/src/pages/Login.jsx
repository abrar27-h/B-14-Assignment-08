import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো এবং রেসপন্স থেকে ইউজার ডাটা নেওয়া
      const res = await axiosInstance.post('/auth/login', { email, password });
      
      // ব্যাকএন্ড থেকে আসা ইউজার অবজেক্ট সেট করা (অথবা রেসপন্স ডাটা)
      setUser(res.data.user || res.data);
      toast.success('Logged in successfully');
      
      // স্পেস রিমুভ করে সরাসরি সঠিক ড্যাশবোর্ড পাথে রিডাইরেক্ট করা
      navigate('/dashboard'); 
    } catch (err) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Login to StudioSpace</h1>
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border space-y-4">
        <div>
          <label className="block text-xs mb-1">Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
        </div>
        <div>
          <label className="block text-xs mb-1">Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
        </div>
        <button type="submit" className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl">Login</button>
        <p className="text-xs text-center">Don't have an account? <Link to="/register" className="underline font-bold">Register</Link></p>
      </form>
    </div>
  );
}