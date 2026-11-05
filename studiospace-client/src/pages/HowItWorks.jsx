import React from 'react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4">How StudioSpace Works</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
          Book your dream creative workspace or list your own studio in just a few simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-6">1</div>
          <h3 className="font-bold text-xl mb-3">Discover Spaces</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Browse through high-end photo studios, film stages, and audio suites tailored to your project.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-6">2</div>
          <h3 className="font-bold text-xl mb-3">Select Hours</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Choose your exact shoot dates, hours, and verify instant availability directly with hosts.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-6">3</div>
          <h3 className="font-bold text-xl mb-3">Book Instantly</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Secure your booking safely with transparent pricing and instant booking confirmation.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <div className="w-14 h-14 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-6">4</div>
          <h3 className="font-bold text-xl mb-3">Create & Produce</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Step into the professional setup and bring your creative vision to life without hassle.</p>
        </div>
      </div>

      <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Ready to start creating?</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Explore hundreds of professional studios available for your next session.</p>
        <Link to="/studios" className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-xl hover:opacity-90 transition">
          Explore All Studios
        </Link>
      </div>
    </div>
  );
}