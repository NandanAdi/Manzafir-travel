import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import CreateTour from './pages/CreateTour';
import Login from './pages/Login';
import Register from './pages/Signup';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PackageDetailPage from './pages/PackageDetailPage';
import Tours from './pages/Tours'
import EditProfile from './pages/EditProfile';
import Matching from './pages/Matching';
import OtherUserProfile from './pages/OtherUserProfile';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tours" element={<ProtectedRoute component={Tours} />}/>
          <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
          <Route path="/profile/:userId" element={<ProtectedRoute component={OtherUserProfile} />} />
          <Route path="/edit-profile" element={<ProtectedRoute component={EditProfile} />} />
          <Route path="/matching" element={<Matching/>} />
          <Route path="/create-tour" element={<ProtectedRoute component={CreateTour} />} />
          <Route path="/packages/:packageId" element={<PackageDetailPage/>} />
           <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<BlogPage />} />
          
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
