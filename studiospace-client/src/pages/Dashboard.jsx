import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8 flex flex-col sm:flex-row items-center gap-6">
        <img 
          src={user?.photoURL || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} 
          alt="User Profile" 
          className="w-20 h-20 rounded-full object-cover border-2 border-black dark:border-white"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
          }}
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {user?.displayName || user?.name || 'Creator'}! 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {user?.email}
          </p>
          <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            Active Member
          </span>
        </div>
      </div>

      {/* Quick Access Action Cards */}
      <h2 className="text-xl font-bold mb-4">Quick Navigation & Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card 1: Add New Studio */}
        <Link 
          to="/add-studio" 
          className="group bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-2xl mb-4 group-hover:scale-105 transition-transform">
            +
          </div>
          <h3 className="text-lg font-bold mb-1">Add New Studio</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            List your creative space, set rental prices, and host creators.
          </p>
        </Link>

        {/* Card 2: My Studio Listings */}
        <Link 
          to="/my-listings" 
          className="group bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">
            🏢
          </div>
          <h3 className="text-lg font-bold mb-1">My Studio Listings</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Manage, update, or remove the studios you have added.
          </p>
        </Link>

        {/* Card 3: My Bookings */}
        <Link 
          to="/my-bookings" 
          className="group bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-105 transition-transform">
            📅
          </div>
          <h3 className="text-lg font-bold mb-1">My Bookings</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            View your upcoming, past, or active studio reservations.
          </p>
        </Link>

      </div>

      {/* Explore Button */}
      <div className="bg-gray-100 dark:bg-gray-800/60 p-6 rounded-3xl text-center flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200 dark:border-gray-700">
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-base">Looking for new studio spaces?</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Explore photo studios, music labs, and film stages.</p>
        </div>
        <button 
          onClick={() => navigate('/studios')} 
          className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-xl hover:opacity-90 transition"
        >
          Explore All Studios
        </button>
      </div>

    </div>
  );
}