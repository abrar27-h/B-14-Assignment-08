import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-16 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">About StudioSpace</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
            Empowering Creators with Professional Spaces.
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
            StudioSpace is a high-performance peer-to-peer marketplace designed specifically for creators, filmmakers, photographers, and musicians. We bridge the gap between visionaries looking for professional environments and studio owners looking to monetize their empty spaces.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <h4 className="text-2xl font-bold text-black dark:text-white">500+</h4>
              <p className="text-xs text-gray-500">Verified Studios</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-black dark:text-white">10k+</h4>
              <p className="text-xs text-gray-500">Happy Creators</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-black dark:text-white">24/7</h4>
              <p className="text-xs text-gray-500">Host Support</p>
            </div>
          </div>
        </div>
        <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80" 
            alt="About StudioSpace" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Have a studio to list?</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Monetize your creative space when it's not in use by hosting verified creators.</p>
        <Link to="/add-studio" className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-xl hover:opacity-90 transition">
          Add New Studio
        </Link>
      </div>
    </div>
  );
}