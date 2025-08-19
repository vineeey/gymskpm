import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GOAL_CHOICES, ACTIVITY_LEVEL_CHOICES, getUserProfile, saveUserProfile } from '../../utils/mockData';

const ProfileEdit = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    heightCm: '',
    weightKg: '',
    diseases: '',
    goal: '',
    activityLevel: '',
    phone: '',
    emergencyContact: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const profile = getUserProfile(user.id);
      if (profile) {
        setFormData({
          age: profile.age || '',
          heightCm: profile.heightCm || '',
          weightKg: profile.weightKg || '',
          diseases: profile.diseases || '',
          goal: profile.goal || '',
          activityLevel: profile.activityLevel || '',
          phone: profile.phone || '',
          emergencyContact: profile.emergencyContact || ''
        });
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const profileData = {
        ...formData,
        userId: user.id,
        age: formData.age ? parseInt(formData.age) : null,
        heightCm: formData.heightCm ? parseFloat(formData.heightCm) : null,
        weightKg: formData.weightKg ? parseFloat(formData.weightKg) : null,
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage
      saveUserProfile(profileData);
      
      // Update auth context
      updateProfile(profileData);

      setMessage('Profile updated successfully!');
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container fade-in-up">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#667eea' 
          }}>
            ✏️ Edit Your Profile
          </h1>

          {message && (
            <div style={{
              background: message.includes('Error') ? 'rgba(220,53,69,0.2)' : 'rgba(40,167,69,0.2)',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              borderLeft: `4px solid ${message.includes('Error') ? '#dc3545' : '#28a745'}`,
              color: message.includes('Error') ? '#721c24' : '#155724'
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <h3 style={{ color: '#f093fb', marginBottom: '20px' }}>📋 Basic Information</h3>
            
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control"
                  min="13"
                  max="100"
                  placeholder="Enter your age"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Physical Measurements */}
            <h3 style={{ color: '#84fab0', marginBottom: '20px', marginTop: '30px' }}>📏 Physical Measurements</h3>
            
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="heightCm">Height (cm)</label>
                <input
                  type="number"
                  id="heightCm"
                  name="heightCm"
                  value={formData.heightCm}
                  onChange={handleChange}
                  className="form-control"
                  min="100"
                  max="250"
                  step="0.1"
                  placeholder="Enter your height in cm"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weightKg">Weight (kg)</label>
                <input
                  type="number"
                  id="weightKg"
                  name="weightKg"
                  value={formData.weightKg}
                  onChange={handleChange}
                  className="form-control"
                  min="30"
                  max="300"
                  step="0.1"
                  placeholder="Enter your weight in kg"
                />
              </div>
            </div>

            {/* Fitness Goals */}
            <h3 style={{ color: '#ffecd2', marginBottom: '20px', marginTop: '30px' }}>🎯 Fitness Goals</h3>
            
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="goal">Primary Goal</label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select your primary goal</option>
                  {GOAL_CHOICES.map(choice => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="activityLevel">Activity Level</label>
                <select
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select your activity level</option>
                  {ACTIVITY_LEVEL_CHOICES.map(choice => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Health Information */}
            <h3 style={{ color: '#667eea', marginBottom: '20px', marginTop: '30px' }}>🏥 Health Information</h3>
            
            <div className="form-group">
              <label htmlFor="diseases">Medical Conditions / Allergies</label>
              <textarea
                id="diseases"
                name="diseases"
                value={formData.diseases}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="List any medical conditions, allergies, or health concerns (or type 'None' if none)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="form-control"
                placeholder="Name and phone number of emergency contact"
              />
            </div>

            {/* Submit Button */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              justifyContent: 'center', 
              marginTop: '40px' 
            }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
                style={{ padding: '15px 40px' }}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div> Saving...
                  </>
                ) : (
                  '💾 Save Profile'
                )}
              </button>
              
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
                style={{ padding: '15px 40px' }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ProfileEdit;