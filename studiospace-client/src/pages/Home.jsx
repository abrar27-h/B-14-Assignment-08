import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import StudioCard from '../components/StudioCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home({ user }) { // ১. এখানে user প্রপস রিসিভ করা হলো
  const [featuredStudios, setFeaturedStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/studios?limit=6')
      .then(res => {
        setFeaturedStudios(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  const categories = [
    { name: 'Photo Studio', icon: '📸' },
    { name: 'Film Stage', icon: '🎬' },
    { name: 'Podcast Lounge', icon: '🎙️' },
    { name: 'Music Suite', icon: '🎵' },
    { name: 'Workshop', icon: '🎨' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Banner / Hero Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="rounded-3xl overflow-hidden shadow-xl h-[400px]"
        >
          <SwiperSlide className="relative bg-black flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80" alt="slide" className="absolute inset-w-full inset-h-full w-full h-full object-cover opacity-50" />
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Book Pro Creative Spaces</h1>
              <p className="text-lg max-w-xl mx-auto mb-6 text-gray-200">Discover cyc walls, podcast lounges, and recording suites instantly.</p>
              {/* লগইন না থাকলে Explore Studios এ ক্লিক করলে login এ যাবে */}
              <Link to={user ? "/studios" : "/login"} className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow hover:bg-gray-100">Explore Studios</Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative bg-black flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80" alt="slide" className="absolute inset-w-full inset-h-full w-full h-full object-cover opacity-50" />
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Host Your Own Creative Space</h1>
              <p className="text-lg max-w-xl mx-auto mb-6 text-gray-200">Monetize your empty studios and connect with professional creators.</p>
              {/* লগইন না থাকলে Add New Studio এ ক্লিক করলে login এ যাবে */}
              <Link to={user ? "/add-studio" : "/login"} className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow hover:bg-gray-100">Add New Studio</Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Studio Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <Link key={idx} to={user ? `/studios?category=${cat.name}` : '/login'} className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center hover:border-black dark:hover:border-white transition">
              <span className="text-3xl mb-2">{cat.icon}</span>
              <span className="font-semibold text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Studios */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Creative Studios</h2>
          <Link to={user ? "/studios" : "/login"} className="text-sm font-semibold hover:underline">View All →</Link>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading studios...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredStudios.map(studio => (
              <StudioCard key={studio._id} studio={studio} user={user} /> // ২. এখানে user={user} পাস করা হলো
            ))}
          </div>
        )}
      </div>

      {/* Static Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4">How Booking Works</h3>
          <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>1. Discover Spaces tailored to your creative project.</li>
            <li>2. Select exact shoot hours & verify availability.</li>
            <li>3. Book Instantly with transparent pricing.</li>
            <li>4. Create & Produce in a professional setup.</li>
          </ol>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4">Host Guarantee & Creator Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Platform assurances covering liability protection, verified profiles, equipment safety, and 24/7 host support to give you complete peace of mind during your shoots.
          </p>
        </div>
      </div>
    </div>
  );






}



{/* How It Works Section */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">How It Works</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
            Book your dream creative workspace or list your own studio in just a few simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
            <h3 className="font-bold text-lg mb-2">Discover Spaces</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Browse through high-end photo studios, film stages, and audio suites.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
            <h3 className="font-bold text-lg mb-2">Select Hours</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose your exact shoot dates, hours, and verify instant availability.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
            <h3 className="font-bold text-lg mb-2">Book Instantly</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Secure your booking securely with transparent pricing and instant confirmation.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-lg mx-auto mb-4">4</div>
            <h3 className="font-bold text-lg mb-2">Create & Produce</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Step into the professional setup and bring your creative vision to life.</p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold mb-4">About StudioSpace</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
              StudioSpace is a high-performance peer-to-peer marketplace designed specifically for creators, filmmakers, photographers, and musicians. We bridge the gap between visionaries looking for professional environments and studio owners looking to monetize their empty spaces.
            </p>
            <div className="flex gap-6">
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
          <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80" 
              alt="About StudioSpace" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>