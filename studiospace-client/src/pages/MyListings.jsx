import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export default function MyListings({ user }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/studios`)
      .then(res => {
        const userListings = res.data.filter(item => item.ownerEmail === user?.email);
        setListings(userListings);
      });
  }, [user]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this studio?')) {
      try {
        await axiosInstance.delete(`/studios/${id}`);
        setListings(listings.filter(item => item._id !== id));
        toast.success('Studio deleted successfully');
      } catch (err) {
        toast.error('Failed to delete studio');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8">My Studio Listings</h1>
      {listings.length === 0 ? (
        <p className="text-gray-500">You have no studio listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map(studio => (
            <div key={studio._id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{studio.title}</h3>
                <p className="text-xs text-gray-500">${studio.hourlyRate}/hr • {studio.category}</p>
              </div>
              <button onClick={() => handleDelete(studio._id)} className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}