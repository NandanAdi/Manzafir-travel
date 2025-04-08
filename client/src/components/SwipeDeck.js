import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';

const SwipeDeck = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:5000/users?userId=${currentUserId}`);
      setUsers(res.data);
    };
    fetchUsers();
  }, [currentUserId]);

  const handleSwipe = async (userId, action) => {
    await axios.post('http://localhost:5000/swipe', {
      userId: currentUserId,
      swipedUserId: userId,
      action,
    });
    setUsers(users.filter((user) => user._id !== userId));
  };

  if (!users.length) return <p className="text-white text-lg">No more users to swipe!</p>;

  return (
    <div className="flex justify-center items-center h-[600px] relative">
      {users.map((user, index) => (
        <UserCard
          key={user._id}
          user={user}
          onSwipeLeft={(id) => handleSwipe(id, 'left')}
          onSwipeRight={(id) => handleSwipe(id, 'right')}
          style={{ zIndex: users.length - index }}
        />
      ))}
    </div>
  );
};

export default SwipeDeck;
