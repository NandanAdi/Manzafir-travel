
import RitikaImage from '../assets/images/Ritika Sharma.JPG';
import AdityaImage from '../assets/images/Aditya Mehra.JPG';
import NitaImage from '../assets/images/Nita & Family.JPG';
import React from "react";

const blogs = [
  {
    title: "A Memorable Solo Escape",
    date: "November 27, 2024",
    author: "Ananya, a solo traveler from Bengaluru",
    description:
      "I’ve always loved traveling solo but struggled to find meaningful experiences beyond generic tours. Manzafir changed that! It recommended a quiet beach retreat in Gokarna, which turned out to be exactly what I needed...",
    image: RitikaImage, // Make sure this image exists in your public folder or update the path accordingly
  },
  {
    title: "An Adventure Made Seamless",
    date: "December 3, 2024",
    author: "Aryan, a solo backpacker from Pune",
    description:
      "When I planned my first solo backpacking trip to Himachal Pradesh, I was nervous about handling everything alone. Enter MANZAFIR—the ultimate game-changer! I found a custom hiking route with budget-friendly hostels...",
    image: AdityaImage,
  },
];

const BlogPage = () => {
  return (
    <div className="bg-[#FFFFFF] min-h-screen text-black px-8 py-32 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Discover travel tips and stories</h1>
        <p className="text-black-300 mb-10">
          Delve deep into actual experiences by people who believed and chose us.
        </p>

        {blogs.map((blog, index) => (
          <div key={index} className="flex flex-col md:flex-row mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-1/2 h-64 object-cover rounded"
            />
            <div className="md:ml-8 mt-4 md:mt-0">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-black-400">{blog.date}</p>
              <p className="italic text-sm mt-1 mb-3">As written by {blog.author}</p>
              <p className="mb-2">{blog.description}</p>
              <a href="#" className="text-blue-300 underline hover:text-blue-100">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
