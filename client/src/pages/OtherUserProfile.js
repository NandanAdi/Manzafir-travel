import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { IoInformationCircleOutline, IoPeople, IoPeopleCircleOutline } from "react-icons/io5";
import { SiAlltrails } from "react-icons/si";
import { TiArrowBack } from "react-icons/ti";
import network from '../assets/network.gif'
import FollowButton from '../components/FollowButton'
import {useAuth} from '../context/AuthContext'

const OtherUserProfile = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openTours, setOpenTours] = useState([]);
  const [joinedTours, setJoinedTours] = useState([]);
  const [activeTour, setActiveTour] = useState(null); // State to track active tour for popup
  const [tours, setTours] = useState([])
  const [openParticipants, setOpenParticipants] = useState(false);
  const {user} = useAuth();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/users/users/${userId}`);
        setProfileData(response.data);
        return response.data; // Return the data for further use
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchTours = async (userId) => {
      try {
        const toursResponse = await axiosInstance.get('/tours');
        const userCreatedTours = toursResponse.data.filter(tour => tour.creatorId._id === userId);
        const userJoinedTours = toursResponse.data.filter(tour =>
          tour.participants.some(participant => participant._id === userId)
        );
        setOpenTours(userCreatedTours);
        setJoinedTours(userJoinedTours);
        
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    const initializeData = async () => {
      setLoading(true);
      const userData = await fetchUserProfile();
      if (userData && userData._id) {
        await fetchTours(userData._id); // Pass the user ID to fetch tours
      }
      setLoading(false);
    };

    initializeData();
  }, []);

  const openDetails = (tour) => {
    setActiveTour(tour); // Set the active tour for the popup
  };

  const closePopup = () => {
    setActiveTour(null); // Close the popup
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Loading User Data</div>;
  }

  const handleFollowChange = (action) => {
    setProfileData((prevData) => {
      const followers = action === 'follow'
        ? [...prevData.followers, user._id]
        : prevData.followers.filter((followerId) => followerId !== user._id);
      return { ...prevData, followers };
    });
  };

  const handleJoinTour = async (tourId) => {
    try {
      const userId = localStorage.getItem('userId'); // Ensure this is available
      if (!userId) {
        console.error("No user ID found in local storage");
        alert("User not logged in.");
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
      alert(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div
    className="relative pb-60 pt-80 h-64 bg-cover bg-center"
    style={{
      backgroundImage: "url('https://images.pexels.com/photos/1058959/pexels-photo-1058959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Add your image path here
    }}
  >
      <div className="py-48">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <img
            src={
              profileData.profilePicture ||
              'https://www.iconninja.com/files/616/221/174/avatar-account-profile-user-person-face-emoji-icon.png'
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <h1 className="mt-4 text-3xl font-bold text-white">{profileData.name}</h1>
          <div className="flex justify-center gap-5 text-xl text-gray-300">
              <span>{profileData.followers.length} Followers</span>
              <span>{profileData.following.length} Following</span>
            </div>
          <p className="text-white mb-4 text-sm mt-2">{profileData.bio || 'No bio available'}</p>
          <FollowButton userId={profileData._id} currentUser={user._id} onFollowChange={handleFollowChange} />
        </div>
      </div>
      </div>
      <div className="container mx-auto px-6 py-10">


        {/* Open Tours Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold justify-self-center text-gray-800 mb-4">{profileData.name}'s Open Tours</h2>
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {openTours.length > 0 ? (
              openTours.map(tour => (
               
                <div key={tour._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <img
                    src={tour.packageId?.imageUrl || 'https://via.placeholder.com/300'}
                    alt={tour.packageId?.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h4 className="text-lg font-semibold text-gray-700 mt-4">{tour.packageId?.name}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Dates: {new Date(tour.travelDates.start).toLocaleDateString()} - {new Date(tour.travelDates.end).toLocaleDateString()}
                  </p>
                  <button
                      className="cursor-pointer"
                      onClick={() => openDetails(tour)}
                    >
                      <IoInformationCircleOutline
                        className="hover:text-white transition-all duration-200 hover:bg-black rounded-full"
                        size={30}
                      />
                    </button>
                </div>
                
              ))
            ) : (
              <p className="text-gray-600 justify-self-center">No open tours found.</p>
            )}
            </div>
        </section>



        {/* Additional user details */}
        <section>
          <h2 className="text-2xl justify-self-center font-bold text-gray-800 mb-4">{profileData.name}'s Joined Tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedTours.length > 0 ? (
              joinedTours.map((tour) => (
                
                <div
                  key={tour._id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 relative"
                >
                  <img
                    src={tour.packageId?.imageUrl || 'https://via.placeholder.com/300'}
                    alt={tour.packageId?.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h4 className="text-lg font-semibold text-gray-700 mt-4">{tour.packageId?.name}</h4>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 mt-2">
                      Dates: {new Date(tour.travelDates.start).toLocaleDateString()} -{' '}
                      {new Date(tour.travelDates.end).toLocaleDateString()}
                    </p>
                    <button
                      className="cursor-pointer"
                      onClick={() => openDetails(tour)}
                    >
                      <IoInformationCircleOutline
                        className="hover:text-white transition-all duration-200 hover:bg-black rounded-full"
                        size={30}
                      />
                    </button>
                  </div>
                </div>
                
              ))
            ) : (
              <div className=''>
              <p className="text-gray-600 justify-self-center">No joined tours found.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Popup */}
      {activeTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-2xl rounded-lg shadow-lg p-6 relative transform transition-all duration-300 scale-100">
            
            <img
            className='rounded-lg mb-5'
            src={activeTour.packageId.imageUrl}
            />
            <div className='flex justify-between mr-2'>
            <h2 className="text-2xl font-bold mb-4">{activeTour.packageId?.name}</h2>
            <div
      className="relative inline-block"
      onMouseEnter={() => setOpenParticipants(true)}
      onMouseLeave={() => setOpenParticipants(false)}
    >
      <IoPeopleCircleOutline
        className="size-9 hover:text-white hover:bg-slate-600 transition-all duration-500 rounded-full"
      />
      {openParticipants && activeTour?.participants?.length > 0 && (
        <div className="absolute top-0 left-full ml-2 bg-white shadow-md border rounded-lg p-2 w-48 z-50">
          <h3 className="text-sm font-bold mb-2 text-gray-700">People Joined:</h3>
          <ul className="text-sm text-gray-600">
            {activeTour.participants.map((participant, index) => (
              <li key={index} className="py-1">
                @{participant.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Dates:</strong>{' '}
              {new Date(activeTour.travelDates.start).toLocaleDateString()} -{' '}
              {new Date(activeTour.travelDates.end).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {activeTour.packageId?.description || 'No description available'}
            </p>
            <p> <strong>Created By : </strong>   {activeTour.creatorId.name} </p>
            <div className='flex gap-5 justify-center'>
            <div className='w-fit'>   
              <button onClick={closePopup} className='bg-orange-300 flex hover:bg-orange-700 hover:text-white transition-all duration-300 p-3 mt-3 rounded-xl'>
              <TiArrowBack className='my-auto mx-1' /> Close
              </button>
            </div>
            <div className=' w-fit'>
              
              <button onClick={() => handleJoinTour(activeTour._id)} className='bg-emerald-300 flex hover:bg-emerald-700 hover:text-white transition-all duration-300 p-3 mt-3 rounded-xl'>
              <img src={network} className='my-auto mx-1 size-5'/>Join Tour
              </button>
              
            </div>
            <div className=' w-fit'>
              <Link to='/tours'>
              <button className='bg-sky-300 flex hover:bg-sky-700 hover:text-white transition-all duration-300 p-3 mt-3 rounded-xl'>
              <SiAlltrails className='my-auto mx-1' />All Tours
              </button>
              </Link>
            </div>
            </div>
          </div>
            
        </div>
      )}
    </div>
  );
};

export default OtherUserProfile;
