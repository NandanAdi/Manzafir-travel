import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { 
  IoCalendarOutline,
  IoPeopleOutline,
  IoLocationOutline,
  IoStar,
  IoChevronForward
} from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile = () => {
  const { user } = useAuth();
 
  const [profileData, setProfileData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [openTours, setOpenTours] = useState([]);
  const [joinedTours, setJoinedTours] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(Boolean)
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await axiosInstance.get('/users/profile');
        setProfileData(profileResponse.data);
        
        setFavorites(profileResponse.data.favorites);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchTours = async () => {
      try {
        const toursResponse = await axiosInstance.get('/tours');
        const userCreatedTours = toursResponse.data.filter(tour => tour.creatorId._id == user._id);
        const userJoinedTours = toursResponse.data.filter(tour => tour.participants.some(participant => participant._id === user._id));
        setOpenTours(userCreatedTours);
        console.log(toursResponse);
        setJoinedTours(userJoinedTours);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchProfile();
    fetchTours();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const openDetails = () => {
    //Open Details Popup
    
    
  }

  return (
    <div className="min-h-screen bg-gray-100">
  {/* Profile Header */}
  <div
    className="relative pb-60 pt-80 bg-cover bg-center"
    style={{
      backgroundImage: "url('https://images.pexels.com/photos/1058959/pexels-photo-1058959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Add your image path here
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col">
      <div>
        {/* Profile Content */}
        {profileData && (
          <>
            <img
              src={
                profileData.profilePicture ||
                'https://www.iconninja.com/files/616/221/174/avatar-account-profile-user-person-face-emoji-icon.png'
              }
              alt="Profile"
              className="w-32 justify-self-center h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className='text-center'>
            <h1 className="mt-4 text-3xl font-bold text-white">{profileData.name}</h1>
            <div className="flex justify-center gap-5 text-xl text-gray-300">
              <span>{profileData.followers.length} Followers</span>
              <span>{profileData.following.length} Following</span>
            </div>
            <p className="text-white w-2/3 text-center justify-self-center text-sm mt-2">{profileData.bio || 'This user has not added a bio.'}</p>
            <button
              className="my-4 justify-self-center bg-white text-indigo-600 py-2 px-4 rounded-full flex items-center space-x-2 shadow-md hover:shadow-lg transition duration-300"
              onClick={handleEditProfile}
            >
              <FaEdit className="text-indigo-600" />
              <span>Edit Profile</span>
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>


      <div className="container mx-auto px-6 py-10">
        {/* Open Tours Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Open Tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {openTours.map(tour => (
                    <TourCard 
                      key={tour._id} 
                      tour={tour} 
                      type="open" 
                      onDetailsClick={() => console.log("tour")}
                    />
                  ))}
          </div>
        </section>

        {/* Joined Tours Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Joined Tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedTours.length > 0 ? (
              joinedTours.map(tour => (
                <TourCard 
                      key={tour._id} 
                      tour={tour} 
                      type="open" 
                      onDetailsClick={() => console.log("tour")}
                    />
              ))
            ) : (
              <p className="text-gray-600">No joined tours found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// Tour Card Component with independent slider state
const TourCard = ({ tour, type = "open", onDetailsClick }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const changeImage = (index) => {
    setCurrentImage(index);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={`http://localhost:5000/${tour.images[currentImage]}`}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        
        {/* Image Navigation Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {tour.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                changeImage(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentImage ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
            />
          ))}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600" />
          )}
        </button>
        
        {/* Tour Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/80 rounded-full backdrop-blur-sm text-sm font-medium">
          {type === "open" ? "Hosting" : "Joined"}
        </div>
      </div>
      
      {/* Tour Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold text-gray-800">{tour.packageId?.name || tour.name}</h4>
          <div className="flex items-center text-amber-400">
            <IoStar className="fill-current" />
            <span className="ml-1 text-gray-700">4.8</span>
          </div>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-600">
            <IoCalendarOutline className="mr-2 text-blue-500" />
            <span>
              {new Date(tour.travelDates.start).toLocaleDateString()} - {new Date(tour.travelDates.end).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <IoPeopleOutline className="mr-2 text-purple-500" />
            <span>{tour.participants.length} participants</span>
          </div>
          
          {tour.destination && (
            <div className="flex items-center text-gray-600">
              <IoLocationOutline className="mr-2 text-red-500" />
              <span>{tour.destination}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={()=> navigate("/tours")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View details <IoChevronForward className="ml-1" />
          </button>
          
          <span className="text-lg font-bold text-gray-800">
            ₹{tour.price?.toLocaleString() || "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
