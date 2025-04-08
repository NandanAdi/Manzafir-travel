import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

const FollowButton = ({ userId, currentUser, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}/follow-status`, {
          params: { currentUser },
        });
        setIsFollowing(response.data.isFollowing); // Assume the backend sends a boolean `isFollowing`
      } catch (error) {
        console.error('Error fetching follow status:', error);
      }
    };

    fetchFollowStatus();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    try {
      const url = isFollowing
        ? `http://localhost:5000/api/users/${userId}/unfollow`
        : `http://localhost:5000/api/users/${userId}/follow`;
      await axios.post(url, { userId: currentUser });
      setIsFollowing(!isFollowing);
      onFollowChange(isFollowing ? 'unfollow' : 'follow'); // Notify parent component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`p-2 flex gap-2 transition-all duration-300 rounded ${isFollowing ? 'bg-lime-300 hover:bg-lime-700 hover:text-white' : 'bg-cyan-200 hover:bg-cyan-700 hover:text-white'}`}
    >
      {isFollowing ? <RiUserUnfollowFill className='my-auto' /> : <RiUserFollowFill className='my-auto' />}
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
