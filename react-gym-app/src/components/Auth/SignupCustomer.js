import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { generateId } from '../../utils/mockData';

const SignupCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password1: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password1) {
      newErrors.password1 = 'Password is required';
    } else if (formData.password1.length < 6) {
      newErrors.password1 = 'Password must be at least 6 characters';
    }

    if (formData.password1 !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    // Check if username or email already exists
    const users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
    if (users.find(u => u.username === formData.username)) {
      newErrors.username = 'Username already exists';
    }
    if (users.find(u => u.email === formData.email)) {
      newErrors.email = 'Email already exists';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // Create new user
      const newUser = {
        id: generateId(),
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userType: 'customer'
      };

      // Save to localStorage
      const users = JSON.parse(localStorage.getItem('gymUsers') || '[]');
      users.push(newUser);
      localStorage.setItem('gymUsers', JSON.stringify(users));

      // Auto-login the new user
      login(newUser);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container fade-in-up">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#f093fb' 
          }}>
            👤 Join as Member
          </h2>

          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div style={{
                background: 'rgba(220,53,69,0.2)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                borderLeft: '4px solid #dc3545',
                color: '#721c24'
              }}>
                {errors.general}
              </div>
            )}

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                {errors.firstName && (
                  <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '5px' }}>
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                {errors.lastName && (
                  <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '5px' }}>
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

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
              />
              {errors.username && (
                <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '5px' }}>
                  {errors.username}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
              {errors.email && (
                <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '5px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="password1">Password</label>
                <input
                  type="password"
                  id="password1"
                  name="password1"
                  value={formData.password1}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                {errors.password1 && (
                  <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '5px' }}>
                    {errors.password1}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                {errors.password2 && (
                  <div style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '5px' }}>
                    {errors.password2}
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '20px', padding: '15px' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div> Creating Account...
                </>
              ) : (
                '🚀 Create Account'
              )}
            </button>
          </form>

          <hr style={{ margin: '30px 0', border: '1px solid rgba(255,255,255,0.1)' }} />

          <div style={{ textAlign: 'center' }}>
            <p>Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login here</Link></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupCustomer;