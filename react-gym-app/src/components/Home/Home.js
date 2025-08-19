import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomeStats } from '../../utils/mockData';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({ totalCustomers: 0, totalTrainers: 0, totalDietPlans: 0 });

  useEffect(() => {
    setStats(getHomeStats());
  }, []);

  return (
    <main className="container fade-in-up">
      <div className="text-center" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome to SKPM Gym 💪
        </h1>
        <p style={{
          fontSize: '1.3rem',
          marginBottom: '40px',
          color: '#666'
        }}>
          Transform your body, elevate your mind. Connect with professional trainers for personalized fitness and nutrition plans.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid-3" style={{ marginBottom: '50px' }}>
        <div className="stats-card">
          <div className="stats-number">{stats.totalCustomers}</div>
          <div className="stats-label">Active Members</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.totalTrainers}</div>
          <div className="stats-label">Expert Trainers</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.totalDietPlans}</div>
          <div className="stats-label">Diet Plans Created</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid">
        <div className="card">
          <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🎯 Personalized Training</h3>
          <p>Get custom workout and diet plans tailored to your fitness goals, health conditions, and lifestyle.</p>
        </div>
        <div className="card">
          <h3 style={{ color: '#f093fb', marginBottom: '15px' }}>👨‍⚕️ Expert Trainers</h3>
          <p>Work with certified trainers who understand your needs and guide you every step of the way.</p>
        </div>
        <div className="card">
          <h3 style={{ color: '#84fab0', marginBottom: '15px' }}>📊 Progress Tracking</h3>
          <p>Monitor your progress with detailed tracking, photos, and regular check-ins with your trainer.</p>
        </div>
        <div className="card">
          <h3 style={{ color: '#ffecd2', marginBottom: '15px' }}>🥗 Nutrition Guidance</h3>
          <p>Receive detailed meal plans, nutrition advice, and dietary recommendations for optimal results.</p>
        </div>
      </div>

      {!isAuthenticated ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ marginBottom: '30px' }}>Ready to start your fitness journey?</h2>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <Link 
              className="btn btn-primary" 
              to="/signup/customer" 
              style={{ padding: '20px 40px', fontSize: '1.1rem' }}
            >
              🚀 Join as Member
            </Link>
            <Link 
              className="btn btn-secondary" 
              to="/signup/trainer" 
              style={{ padding: '20px 40px', fontSize: '1.1rem' }}
            >
              💼 Join as Trainer
            </Link>
            <Link 
              className="btn btn-success" 
              to="/login" 
              style={{ padding: '20px 40px', fontSize: '1.1rem' }}
            >
              🔐 Login
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ marginBottom: '20px' }}>Welcome back, {user.firstName}! 👋</h2>
          <Link 
            className="btn btn-primary" 
            to="/dashboard" 
            style={{ padding: '20px 40px', fontSize: '1.1rem' }}
          >
            📊 Go to Dashboard
          </Link>
        </div>
      )}
    </main>
  );
};

export default Home;