import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock authentication - check localStorage for users
      const users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
      const user = users.find(u => u.username === formData.username);
      
      if (!user) {
        setError('Invalid username or password');
        return;
      }

      // In a real app, you'd verify the password hash
      // For demo purposes, we'll accept any password
      
      // Get user profile
      const profiles = JSON.parse(localStorage.getItem('gymProfiles') || '[]');
      const profile = profiles.find(p => p.userId === user.id);
      
      const userData = {
        ...user,
        profile: profile || null
      };

      login(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container fade-in-up">
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#667eea' 
          }}>
            🔐 Welcome Back
          </h2>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: 'rgba(220,53,69,0.2)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                borderLeft: '4px solid #dc3545',
                color: '#721c24'
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '20px', padding: '15px' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div> Logging in...
                </>
              ) : (
                '🚀 Login'
              )}
            </button>
          </form>

          <hr style={{ margin: '30px 0', border: '1px solid rgba(255,255,255,0.1)' }} />

          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '15px' }}>Don't have an account?</p>
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <Link className="btn btn-secondary" to="/signup/customer">
                👤 Join as Member
              </Link>
              <Link className="btn btn-warning" to="/signup/trainer">
                💼 Join as Trainer
              </Link>
            </div>
          </div>

          {/* Demo credentials info */}
          <div style={{
            marginTop: '30px',
            padding: '15px',
            background: 'rgba(132, 250, 176, 0.1)',
            borderRadius: '8px',
            borderLeft: '4px solid #84fab0'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>Demo Credentials:</h4>
            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
              <strong>Customer:</strong> mike_customer / any password
            </p>
            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
              <strong>Trainer:</strong> john_trainer / any password
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;