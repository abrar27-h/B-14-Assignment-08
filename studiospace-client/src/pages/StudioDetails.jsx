import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export default function StudioDetails({ user }) {
  const { id } = useParams();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({ date: '', startTime: '', endTime: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/studios/${id}`)
      .then(res => {
        setStudio(res.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error('Failed to load studio details');
        setLoading(false);
      });
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login first to book a workspace');
      navigate('/login');
      return;
    }

    const hours = 3; // Simplified duration calculation for example
    const totalCost = hours * studio.hourlyRate;

    const payload = {
      studioId: studio._id,
      studioTitle: studio.title,
      studioImage: studio.imageURL,
      userEmail: user.email,
      userName: user.displayName || user.name || 'User',
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      totalCost
    };

    try {
      await axiosInstance.post('/bookings', payload);
      toast.success('Studio booked successfully (Status: Pending)');
      setShowModal(false);
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking conflict or error occurred');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!studio) return <div className="text-center py-20">Studio not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <img src={studio.imageURL} alt={studio.title} className="w-full h-[400px] object-cover rounded-3xl shadow-lg" />
        <div className="flex flex-col justify-between">
          <div>
            <span className="bg-black text-white dark:bg-white dark:text-black text-xs font-semibold px-3 py-1 rounded-full uppercase">
              {studio.category}
            </span>
            <h1 className="text-3xl font-extrabold mt-4 mb-2">{studio.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">📍 {studio.location}</p>
            <p className="text-2xl font-bold mb-6">${studio.hourlyRate} <span className="text-xs font-normal text-gray-500">/ hour</span></p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{studio.overview}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-sm">Amenities:</h4>
              <div className="flex flex-wrap gap-2">
                {studio.amenities?.map((amenity, idx) => (
                  <span key={idx} className="bg-gray-200 dark:bg-gray-800 text-xs px-3 py-1 rounded-lg">{amenity}</span>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl shadow hover:opacity-90"
          >
            Book Workspace Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">Confirm Workspace Booking</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Select Date</label>
                <input 
                  type="date" 
                  required 
                  value={bookingData.date} 
                  onChange={e => setBookingData({...bookingData, date: e.target.value})} 
                  className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">Start Time</label>
                  <input 
                    type="time" 
                    required 
                    value={bookingData.startTime} 
                    onChange={e => setBookingData({...bookingData, startTime: e.target.value})} 
                    className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">End Time</label>
                  <input 
                    type="time" 
                    required 
                    value={bookingData.endTime} 
                    onChange={e => setBookingData({...bookingData, endTime: e.target.value})} 
                    className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-700 text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl text-sm font-medium">Cancel</button>
                <button type="submit" className="w-1/2 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}