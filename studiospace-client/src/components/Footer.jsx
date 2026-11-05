import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Logo & Mission Statement */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-bold">S</div>
            <span className="font-bold text-lg">StudioSpace</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            High-performance peer-to-peer marketplace for creators, filmmakers, photographers, and musicians. Connecting visionaries with professional spaces.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/studios" className="hover:text-white transition">Explore Studios</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login / Register</Link></li>
          </ul>
        </div>

        {/* Popular Studio Categories */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Popular Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/studios?category=Photo+Studio" className="hover:text-white transition">Photo Studios</Link></li>
            <li><Link to="/studios?category=Film+Stage" className="hover:text-white transition">Film Stages</Link></li>
            <li><Link to="/studios?category=Podcast+Lounge" className="hover:text-white transition">Podcast Lounges</Link></li>
            <li><Link to="/studios?category=Music+Suite" className="hover:text-white transition">Music Suites</Link></li>
          </ul>
        </div>

        {/* Newsletter Input */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }} className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-gray-500" 
              required 
            />
            <button type="submit" className="bg-white text-black font-medium py-2 rounded-lg text-sm hover:bg-gray-200 transition">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Copyright, Terms & Social Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} StudioSpace Inc. All rights reserved.</p>
        
        {/* Extended Social Links */}
        <div className="flex items-center gap-5 mt-4 sm:mt-0 text-sm">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="Facebook">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="Instagram">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition font-bold tracking-wider" aria-label="X (Twitter)">
            𝕏
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="YouTube">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}