import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import SwipeDeck from '../components/SwipeDeck';
import { useAuth } from '../context/AuthContext';
import { MdCompareArrows } from "react-icons/md";

const Matching = () => {
  const { user } = useAuth();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('swiping');

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        if (user) {
          const response = await axiosInstance.get(`http://localhost:5000/matches?userId=${user._id}`);
          setMatchedUsers(response.data);
        }
      } catch (error) {
        console.error('Error fetching matched users:', error);
      }
    };
    fetchMatchedUsers();
  }, [activeTab]);

  return (
    <div className="pt-40 bg-gray-900 min-h-screen py-8 relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}></div>
      
      <div className="container mx-auto text-center text-white relative z-10">
        {/* Title */}
        <h1 className="text-5xl font-bold mb-8">Find Your Match</h1>

        {/* Tabs Navigation */}
        <div className="tabs flex justify-center space-x-8 mb-12">
          <button
            onClick={() => setActiveTab('swiping')}
            className={`text-xl p-2 rounded-lg font-medium ${activeTab === 'swiping' ? 'text-pink-500 bg-white ' : 'text-white'} transition duration-300 hover:text-pink-400`}
          >
            Swiping
          </button>
          <div >
          <MdCompareArrows className='ml-16' size={45}/>
          </div>
          <button
            onClick={() => setActiveTab('matched')}
            className={`text-xl p-2 rounded-lg font-medium ${activeTab === 'matched' ? 'text-pink-500 bg-white ' : 'text-white'} transition duration-300 hover:text-pink-400`}
          >
            Matched Users
          </button>
        </div>

        {/* Swiping Tab */}
        {activeTab === 'swiping' && (
          <div className="flex justify-center">
            {user ? (
              <SwipeDeck currentUserId={user._id} />
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        )}

        {/* Matched Users Tab */}
        {activeTab === 'matched' && (
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-6">Matched Users</h2>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchedUsers.length > 0 ? (
                matchedUsers.map((matchedUser) => (
                  <li
                    key={matchedUser._id}
                    className="p-6 bg-white bg-opacity-90 rounded-lg shadow-lg text-center hover:scale-105 transform transition duration-300"
                  >
                    <img
                      className="w-24 h-24 mx-auto rounded-full object-cover"
                      src={matchedUser.profilePicture || 'https://via.placeholder.com/150'}
                      alt={matchedUser.name}
                    />
                    <h3 className="mt-4 text-2xl text-black font-semibold">{matchedUser.name}</h3>
                    <p className="mt-2 text-gray-700">{matchedUser.bio || 'No bio available'}</p>
                    <Link
                      to={`/profile/${matchedUser._id}`}
                      className="mt-4 inline-block bg-pink-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
                    >
                      View Profile
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-white text-lg">No matched users yet!</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matching;
