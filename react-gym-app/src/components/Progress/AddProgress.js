import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { generateId } from '../../utils/mockData';

const AddProgress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    weightKg: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demo purposes, we'll just store the file name
      // In a real app, you'd upload to a server or cloud storage
      setFormData(prev => ({
        ...prev,
        photo: file.name
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Basic validation
    if (!formData.weightKg || formData.weightKg <= 0) {
      setMessage('Please enter a valid weight.');
      setLoading(false);
      return;
    }

    try {
      const progressRecord = {
        id: generateId(),
        customerId: user.id,
        weightKg: parseFloat(formData.weightKg),
        date: formData.date,
        notes: formData.notes.trim(),
        photo: formData.photo, // In real app, this would be a URL after upload
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const allProgress = JSON.parse(localStorage.getItem('gymProgress') || '[]');
      allProgress.push(progressRecord);
      localStorage.setItem('gymProgress', JSON.stringify(allProgress));

      setMessage('Progress record added successfully!');
      
      // Reset form
      setFormData({
        weightKg: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        photo: null
      });
      setPhotoPreview(null);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setMessage('Error adding progress record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container fade-in-up">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#667eea' 
          }}>
            📈 Add Progress Record
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
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="weightKg">Weight (kg) *</label>
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
                  required
                  placeholder="Enter your current weight"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="How are you feeling? Any observations about your progress, energy levels, workout performance, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="photo">Progress Photo (Optional)</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handlePhotoChange}
                className="form-control"
                accept="image/*"
              />
              <small style={{ color: '#666', fontSize: '0.9rem' }}>
                Upload a progress photo to track visual changes over time.
              </small>
              
              {photoPreview && (
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <img 
                    src={photoPreview} 
                    alt="Progress photo preview" 
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      border: '2px solid #ddd'
                    }}
                  />
                  <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
                    Photo preview
                  </p>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div style={{
              background: 'rgba(132, 250, 176, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '30px',
              borderLeft: '4px solid #84fab0'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>📝 Progress Tracking Tips:</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#155724' }}>
                <li>Weigh yourself at the same time each day (preferably morning)</li>
                <li>Take photos in consistent lighting and poses</li>
                <li>Note how you feel - energy levels, mood, strength</li>
                <li>Record any challenges or victories from the week</li>
                <li>Be honest and consistent with your tracking</li>
              </ul>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              justifyContent: 'center',
              marginTop: '30px'
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
                  '📈 Add Progress'
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

export default AddProgress;