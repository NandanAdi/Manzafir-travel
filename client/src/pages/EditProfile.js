import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

const EditProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    profilePicture: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/users/profile');
        setProfileData({
          name: response.data.name,
          bio: response.data.bio,
          profilePicture: response.data.profilePicture || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosInstance.put('/users/profile', profileData);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Your Profile</h2>

        {/* Profile Picture Section */}
        <div className="flex text-center justify-center mb-6 relative">
          <img
            src={
              profileData.profilePicture ||
              'https://www.iconninja.com/files/616/221/174/avatar-account-profile-user-person-face-emoji-icon.png'
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute px-3 items-center text-center translate-y-14 -translate-x-14 bottom-0 right-0  bg-indigo-500 text-white py-1 rounded-full cursor-pointer"
            onChange={handleProfilePictureChange}
          />
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mt-20 text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Bio Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Bio</label>
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span>Saving...</span>
          ) : (
            <>
              <FaSave />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
