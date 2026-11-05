import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import StudioCard from '../components/StudioCard';

export default function Studios({ user }) { // ১. এখানে user প্রপস রিসিভ করা হলো
  const [studios, setStudios] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = '/studios';
    const params = [];
    if (categoryFilter !== 'All') params.push(`category=${categoryFilter}`);
    if (searchQuery) params.push(`search=${searchQuery}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    axiosInstance.get(url)
      .then(res => {
        setStudios(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [categoryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold">Explore All Studios</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-sm focus:outline-none w-full md:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading workspaces...</div>
      ) : studios.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
          <p className="text-lg font-medium text-gray-500">No studios found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {studios.map(studio => (
            <StudioCard key={studio._id} studio={studio} user={user} /> // ২. এখানে user={user} পাস করা হলো
          ))}
        </div>
      )}
    </div>
  );
}