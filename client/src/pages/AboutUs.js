import React, { useState, useRef, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";
import dev1 from "../assets/images/dev1.jpg"; 
import dev2 from "../assets/images/dev2.jpg";
import dev3 from "../assets/images/dev3.jpg";
import dev4 from "../assets/images/dev4.jpg";
import "../styles/Aboutus.css";

const teamMembers = [
  {
    name: "Aditya Nandan",
    role: "UI/UX Designer & Backend Developer",
    bio: "Blending creativity with functionality, our UI/UX designer ensures that every interface is both visually appealing and intuitive. On the backend, they build the architecture that powers our applications, ensuring security, scalability, and efficiency.",
    img: dev1,
  },
  {
    name: "Raj Mane",
    role: "Frontend Developer",
    bio: "Our frontend developer specializes in building dynamic and interactive web applications using React.js. With expertise in modern JavaScript frameworks, component-based architecture, and performance optimization, they ensure a seamless and responsive user experience.",
    img: dev2,
  },
  {
    name: "Aaquib Ansari",
    role: "Machine Learning Engineer",
    bio: "Passionate about AI and data-driven solutions, our machine learning engineer leverages algorithms and predictive models to enhance our applications. From automation to intelligent decision-making, they bring innovation through cutting-edge technology.",
    img: dev3,
  },
  {
    name: "Anushka Sonawane",
    role: "Project Manager",
    bio: "With a keen eye for detail and exceptional organizational skills, our project manager ensures every phase of development runs smoothly. From planning to execution, they maintain clear communication, manage timelines, and deliver successful outcomes.",
    img: dev4,
  },
];

function AboutUs() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const chatRef = useRef(null);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages);
      setUserInput("");

      const botResponse = getBotResponse(userInput);
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }
  };

 
  const getBotResponse = (input) => {
    input = input.toLowerCase();

    if (input.includes("tour") || input.includes("package")) {
      return "We offer a variety of tour packages. Visit our 'Packages' page for more details: [Visit Packages](#)";
    }

    if (input.includes("booking") || input.includes("track")) {
      return "You can track your bookings in your profile under 'My Bookings'. Let us know if you need help!";
    }

    if (input.includes("contact") || input.includes("help")) {
      return "You can contact us via phone, email, or Instagram. Check the 'Contact Us' section below.";
    }

    return "I'm here to assist you. Please let me know how I can help!";
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-6xl font-extrabold text-center text-blue-700 mb-12 mt-9 animate-pulse">
          Meet Our Team
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-700 mb-16 text-xl leading-relaxed">
          We're a team of four passionate professionals, each bringing unique expertise to the table. From crafting beautiful user interfaces to building robust backend systems, managing projects, and exploring cutting-edge machine learning, we work together to create seamless digital experiences.
        </p>

        <div className="grid md:grid-cols-4 gap-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-2xl rounded-3xl text-center transform transition-transform duration-500 hover:scale-110 hover:shadow-3xl"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 mx-auto rounded-full mb-8 object-cover border-4 border-blue-500 hover:border-blue-700"
              />
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">{member.name}</h3>
              <p className="text-blue-600 font-medium text-xl mb-4">{member.role}</p>
              <p className="text-gray-600 mt-4 text-lg leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

           
    <div className="mt-24 text-center border-4 border-blue-500 rounded-3xl p-12 shadow-xl">
    <h3 className="text-4xl font-extrabold text-blue-700 mb-8">Contact Us</h3>
    <div className="flex justify-center space-x-16">
      <a href="tel:+1234567890" className="flex items-center text-xl text-gray-800 hover:text-blue-600">
        <FaPhoneAlt className="mr-4 text-3xl" /> +91 7039366269
      </a>
      <a href="mailto:support@manzafir.com" className="flex items-center text-xl text-gray-800 hover:text-blue-600">
        <FaEnvelope className="mr-4 text-3xl" />help.manzafir@gmail.com
      </a>
      <a href="https://www.instagram.com/aditya_nandan._?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-center text-xl text-gray-800 hover:text-blue-600">
        <FaInstagram className="mr-4 text-3xl" /> @manzafir
      </a>
    </div>
  </div>


        
        <div className="fixed bottom-8 right-8">
          <button onClick={toggleChat} className="flex items-center bg-blue-600 text-white p-5 rounded-full shadow-2xl hover:bg-blue-700 transition-transform duration-300 hover:scale-110">
            <FaComments className="text-3xl mr-2" />
            Help & Support
          </button>
          {isChatOpen && (
            <div className="fixed bottom-24 right-8 bg-white shadow-2xl rounded-3xl w-80 h-96 flex flex-col">
              <div className="p-4 bg-blue-600 text-white rounded-t-3xl flex justify-between items-center">
                <span>Support Bot</span>
                <FaTimes onClick={toggleChat} className="cursor-pointer" />
              </div>
              <div ref={chatRef} className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                    <p className="p-2 rounded-lg inline-block mb-2" style={{ background: msg.sender === "user" ? "#DCF8C6" : "#E5E7EB" }}>{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 flex items-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 p-2 border rounded-l-lg"
                  placeholder="Type your message..."
                />
                <FaPaperPlane onClick={handleSendMessage} className="cursor-pointer text-blue-600 text-2xl ml-2" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
