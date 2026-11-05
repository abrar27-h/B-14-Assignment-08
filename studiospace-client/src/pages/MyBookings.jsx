import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/bookings?email=${user.email}`)
        .then(res => setBookings(res.data));
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axiosInstance.patch(`/bookings/${id}`, { status: 'Cancelled' });
      setBookings(bookings.map(b => b._id === id ? {...b, status: 'Cancelled'} : b));
      toast.success('Booking cancelled');
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <img src={booking.studioImage} alt="" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold">{booking.studioTitle}</h3>
                  <p className="text-xs text-gray-500">Date: {booking.date} | Time: {booking.startTime} - {booking.endTime}</p>
                  <p className="text-xs font-semibold mt-1">Status: <span className="text-blue-500">{booking.status}</span></p>
                </div>
              </div>
              {booking.status === 'Pending' && (
                <button onClick={() => handleCancel(booking._id)} className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl">Cancel</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}