import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';

const CreateTour = () => {
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState('');
  const [travelDates, setTravelDates] = useState({ start: '', end: '' });
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get('/packages');
        setPackages(response.data);
      } catch (err) {
        setError('Failed to load packages');
      }
    };

    fetchPackages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("packageId", packageId);
    formData.append("creatorId", userId);
    formData.append("travelDates", JSON.stringify(travelDates));
    formData.append("price", price);
    formData.append("description", description);
    formData.append("name", name);


    images.forEach((image) => {
      formData.append("images[]", image); // Use "images[]" to properly send as an array
    });

    try {
      const response = await axiosInstance.post('/tours/create', formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Ensure correct headers
      });
      console.log("Tour created successfully:", response.data);
      navigate('/tours');
    } catch (err) {
      console.error("Error creating tour:", err);
      setError('Failed to create tour');
    }
};

  const handleImageChange = (e) => {
    setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen flex items-center justify-center pt-28">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-300 blur-sm rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply blur-sm opacity-30 animate-pulse"></div>
      <div className="absolute bottom-64 right-[1300px] w-32 h-32 bg-green-400 rounded-full mix-blend-multiply blur-[7px] opacity-30 animate-pulse"></div>
      
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-w-xl w-full">
        <Link to="/tours"><TiArrowBack className='my-auto mx-1 size-12' /></Link>
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Create <span className="text-blue-500">Your Tour</span>
        </h1>
        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Tour Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="packageId"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Package
            </label>
            <select
              id="packageId"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            >
              <option value="">Choose a package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="start"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start"
              value={travelDates.start}
              onChange={(e) =>
                setTravelDates({ ...travelDates, start: e.target.value })
              }
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="end"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="end"
              value={travelDates.end}
              onChange={(e) =>
                setTravelDates({ ...travelDates, end: e.target.value })
              }
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              required
            />
          </div>
        <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">Upload Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border-2 border-gray-300 rounded-lg"
          accept="image/*"
        />
        </div>              
          <button
            type="submit"
            className="w-full py-4 bg-blue-500 text-white text-xl font-semibold rounded-xl hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Create Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTour;
