import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export default function AddStudio({ user }) {
  const [formData, setFormData] = useState({
    title: '', category: 'Photo Studio', hourlyRate: '', securityDeposit: '',
    maxCapacity: '', location: '', imageURL: '', amenities: '', overview: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: formData.amenities.split(',').map(item => item.trim()),
      ownerEmail: user.email,
      ownerName: user.displayName || user.name || 'Owner'
    };

    try {
      await axiosInstance.post('/studios', payload);
      toast.success('Studio added successfully!');
      navigate('/my-listings');
    } catch (err) {
      toast.error('Failed to add studio');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8">Add New Studio Listing</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <label className="block text-xs font-medium mb-1">Studio Title</label>
          <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm">
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Lounge">Podcast Lounge</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Location / Address</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Hourly Rate ($)</label>
            <input type="number" required value={formData.hourlyRate} onChange={e => setFormData({...formData, hourlyRate: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Security Deposit ($)</label>
            <input type="number" required value={formData.securityDeposit} onChange={e => setFormData({...formData, securityDeposit: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Max Capacity</label>
            <input type="number" required value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Image URL</label>
          <input type="url" required value={formData.imageURL} onChange={e => setFormData({...formData, imageURL: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Amenities (Comma separated)</label>
          <input type="text" placeholder="WiFi, AC, Lighting Kit" value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Detailed Overview</label>
          <textarea rows="4" required value={formData.overview} onChange={e => setFormData({...formData, overview: e.target.value})} className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm"></textarea>
        </div>
        <button type="submit" className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl">Publish Listing</button>
      </form>
    </div>
  );
}