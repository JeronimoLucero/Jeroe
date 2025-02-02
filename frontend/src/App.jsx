import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StorePage from './pages/StorePage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/footer'
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='min-h-screen flex flex-col'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />

        </div>
        
      </Router>
    </AuthProvider>
  );
};

export default App;
