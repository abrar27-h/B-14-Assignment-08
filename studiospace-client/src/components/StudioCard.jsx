import React from 'react';
import { Link } from 'react-router-dom';

export default function StudioCard({ studio, user }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img src={studio.imageURL} alt={studio.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded-full font-medium">
          {studio.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{studio.title}</h3>
          <span className="text-sm font-bold text-black dark:text-white">${studio.hourlyRate}/hr</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">{studio.location}</p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs font-semibold text-amber-500">★ {studio.rating || '5.0'}</span>
          
          {/* ইউজার চেক করে ডাইরেক্ট ডিটেইলস অথবা লগইন পেজে রিডাইরেক্ট করবে */}
          <Link 
            to={user ? `/studios/${studio._id}` : '/login'} 
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-medium hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}