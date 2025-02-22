import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';  // This should work now
import { UserProvider } from './context/UserContext'; // Import UserProvider
import Navbar from './components/Navbar';
import Footer from './components/footer';
import HomePage from './pages/home';
import StorePage from './pages/StorePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute'; // Ruta protegida

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
