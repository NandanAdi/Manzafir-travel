import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHeart } from 'react-icons/fa';

const UserCard = ({ user, onSwipeLeft, onSwipeRight, style }) => {
  return (
    <motion.div
      className="absolute w-[500px] bg-white p-6 rounded-lg shadow-xl"
      drag="x"
      dragConstraints={{ left: -150, right: 150 }}
      onDragEnd={(event, info) => {
        if (info.offset.x < -100) {
          onSwipeLeft(user._id);
        } else if (info.offset.x > 100) {
          onSwipeRight(user._id);
        }
      }}
      style={style}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative">
        <img
          className="w-full h-96 object-cover rounded-lg"
          src={user.profilePicture || 'https://via.placeholder.com/300'}
          alt={user.name}
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </div>
      <h3 className="text-2xl text-black font-bold mt-4">@{user.name}</h3>
      <p className="text-gray-700 mt-2">{user.bio || 'No bio available'}</p>
      <div className="flex justify-around mt-6">
        <button
          className="bg-red-200 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
          onClick={() => onSwipeLeft(user._id)}
        >
          <FaTimes className="text-3xl" />
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          onClick={() => onSwipeRight(user._id)}
        >
          <FaHeart className="text-3xl" />
        </button>
      </div>
    </motion.div>
  );
};

export default UserCard;
