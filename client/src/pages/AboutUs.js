import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SmartSupportBot from "../components/SmartSupportBot";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const team = [
  {
    name: "Aditya Nandan",
    role: "UI/UX Designer & Backend Developer",
    image: require("../assets/images/dev1.jpg"),
    bio: "Blending creativity with functionality, our UI/UX designer ensures that every interface is both visually appealing and intuitive. On the backend, they build the architecture that powers our applications, ensuring security, scalability, and efficiency.",
    linkedin: "https://www.linkedin.com/in/adinandan/",
    portfolio: "https://gaurav-portfolio.dev"
  },
  {
    name: "Raj Mane",
    role: "Frontend Developer",
    image: require("../assets/images/dev2.jpg"),
    bio: "Our frontend developer specializes in building dynamic and interactive web applications using React.js. With expertise in modern JavaScript frameworks, component-based architecture, and performance optimization, they ensure a seamless and responsive user experience.",
    linkedin: "https://linkedin.com/in/nandan",
    portfolio: "https://nandan.dev"
  },
  {
    name: "Aaquib Ansari",
    role: "Machine Learning Engineer",
    image: require("../assets/images/dev3.jpg"),
    bio: "Passionate about AI and data-driven solutions, our machine learning engineer leverages algorithms and predictive models to enhance our applications. From automation to intelligent decision-making, they bring innovation through cutting-edge technology.",
    linkedin: "https://linkedin.com/in/aarav",
    portfolio: "https://ishant.tech"
  },
  {
    name: "Anushka Sonawane",
    role: "Project Manager",
    image: require("../assets/images/dev4.jpg"),
    bio: "With a keen eye for detail and exceptional organizational skills, our project manager ensures every phase of development runs smoothly. From planning to execution, they maintain clear communication, manage timelines, and deliver successful outcomes.",
    linkedin: "https://linkedin.com/in/aarav",
    portfolio: "https://aarav.dev"
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-300 min-h-screen">
      <Navbar />

      <section className="text-center py-20">
        <h1 className="text-6xl font-bold text-gray-800 animate-pulse mb-4">Meet Our Team</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          We're a group of passionate travel technologists bringing together the best of software and wanderlust. Let us show you how tech can redefine your next journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
              <h3 className="text-2xl font-semibold mt-4">{member.name}</h3>
              <p className=" text-xl text-blue-500 font-medium">{member.role}</p>
              <p className="text-lg text-gray-600 mt-2">{member.bio}</p>
              <div className="flex justify-center gap-4 mt-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                  >
                    <FaGlobe /> Portfolio
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white shadow-md max-w-xl mx-auto rounded-lg py-8 px-6 mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 animate-pulse mb-4">
          <a href="contact">Contact Us</a>
        </h2>
        <div className="flex justify-center gap-6 text-blue-600 text-l">
          <a href="tel:+917039366269" className="hover:text-blue-800">📞 703-936-6269</a>
          <a href="mailto:adminish29@gmail.com" className="hover:text-blue-800">✉️ adminish29@gmail.com</a>
          <a href="https://instagram.com" className="hover:text-blue-800" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
        </div>
      </section>

      <SmartSupportBot />
    </div>
  );
};

export default AboutUs;
