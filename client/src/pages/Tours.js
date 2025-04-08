import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { SiAlltrails } from 'react-icons/si';
import { PiArrowBendUpLeftFill, PiArrowBendUpRightFill } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const TourCard = ({ tour, handleJoinTour }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = tour.images; // Use tour.images directly
  const [isExpanded, setIsExpanded] = useState(false);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300">
      {/* Image Slider */}
      <div className="relative w-full h-56">
        {images.length > 0 ? (
          <img
            src={`http://localhost:5000/${images[currentIndex]}`} 
            alt={`Tour Image ${currentIndex + 1}`}
            className="w-full h-56 object-cover"
          />
        ):
        (
          <img src='https://img.freepik.com/free-photo/top-view-world-tourism-day-with-passport_23-2148608861.jpg'/>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Tour Info */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{tour.name}</h2>
        <p className={`text-gray-600 mb-4 text-sm ${!isExpanded ? 'line-clamp-3' : ''}`}>
  {tour.description}
</p>

  <button
    onClick={() => setIsExpanded(!isExpanded)}
    className="text-blue-600 hover:underline text-sm"
  >
    {isExpanded ? 'See Less' : 'See More'}
  </button>


        <p className="text-gray-700 mb-2">
          <strong>Travel Dates:</strong>{' '}
          {new Date(tour.travelDates.start).toLocaleDateString()} -{' '}
          {new Date(tour.travelDates.end).toLocaleDateString()}
        </p>

        <p className="text-gray-700 mb-4">
          <strong>Created By:</strong>{' '}
          <b className="ml-2 text-blue-600 underline underline-offset-2">
            <Link to={`/profile/${tour.creatorId._id}`}>
              @{tour.creatorId.name}
            </Link>
          </b>
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Price :</strong> {tour.price}
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Participants:</h3>
          <ul className="list-disc pl-5 text-gray-600">
            {tour.participants.length > 0 ? (
              tour.participants.map((user) => <li key={user._id}>{user.name}</li>)
            ) : (
              <li>No participants yet</li>
            )}
          </ul>
        </div>

        <button
          onClick={() => handleJoinTour(tour._id)}
          className="w-fit justify-self-center bg-green-900 flex text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          <SiAlltrails className="my-auto mx-1" />
          Join Tour
        </button>
      </div>
    </div>
  );

}

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axiosInstance.get('/tours');
        setTours(response.data);
      } catch (err) {
        setError('Failed to fetch tours');
      }
    };

    fetchTours();
  }, [tours]);

  

  const handleJoinTour = async (tourId) => {
    try {
      const userId = localStorage.getItem('userId'); // Ensure this is available
      if (!userId) {
        console.error("No user ID found in local storage");
        setError("User not logged in.");
        return;
      }

      console.log('User ID:', userId); // Debugging line to check the userId

      const response = await axiosInstance.post(`/tours/${tourId}/join`, { userId });
      console.log('Tour joined successfully:', response.data); // Debugging line to check response

      setTours((prevTours) =>
        prevTours.map((tour) =>
          tour._id === tourId
            ? { ...tour, participants: [...tour.participants, userId] }
            : tour
        )
      );
    } catch (err) {
      console.error('Error joining tour:', err.response?.data || err.message);
      toast.warning(err.response?.data);
    }
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen text-gray-800"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 pt-32 px-6 py-12">
      <ToastContainer 
      stacked
  className="z-50" 
  position="top-right" 
  autoClose={5000} 
  style={{ marginTop: '4rem' }} 
/>
<div className='flex justify-center'>
        <h1 className="text-5xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Explore Amazing Tours
        </h1>
        <div className="text-white flex gap-4 my-auto absolute translate-x-[500px] translate-y-2 group">
      {/* Right Arrow */}
      <PiArrowBendUpRightFill
        size={40}
        className="transition-transform duration-300 group-hover:translate-x-[15px]"
      />
      
      {/* Button */}
      <Link to="/create-tour">
        <button className="text-4xl bg-teal-600 hover:bg-teal-400 transition-all duration-300 px-2 py-1 rounded-xl flex">
          Create Tour
        </button>
      </Link>

      {/* Left Arrow */}
      <PiArrowBendUpLeftFill
        size={40}
        className="transition-transform duration-300 group-hover:translate-x-[-15px]"
      />
    </div>
    
        </div>
        {tours.length === 0 ? (
          <p className="text-center text-gray-200 text-xl animate-pulse">
            Loading Open Tours...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} handleJoinTour={handleJoinTour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
