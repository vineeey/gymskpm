import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated, isTrainer } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <Link to="/" className="brand">💪 SKPM Gym</Link>
      <nav className="nav-menu">
        <Link to="/">🏠 Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">📊 Dashboard</Link>
            {isTrainer ? (
              <Link to="/customers">👥 Customers</Link>
            ) : (
              <>
                <Link to="/profile/edit">✏️ Edit Profile</Link>
                <Link to="/progress/add">📈 Add Progress</Link>
              </>
            )}
            <button 
              onClick={handleLogout} 
              className="btn btn-secondary"
              style={{ border: 'none', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
            >
              🚪 Logout ({user.firstName})
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-primary">🔐 Login</Link>
            <Link to="/signup/customer" className="btn-secondary">👤 Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;