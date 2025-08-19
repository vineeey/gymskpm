import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { calculateBMI, getBMICategory, getBMIColor, getUserProfile } from '../../utils/mockData';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [dietPlans, setDietPlans] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [recentProgress, setRecentProgress] = useState([]);

  useEffect(() => {
    if (user) {
      // Load user profile
      const userProfile = getUserProfile(user.id);
      setProfile(userProfile);

      // Load diet plans
      const allDietPlans = JSON.parse(localStorage.getItem('gymDietPlans') || '[]');
      const userDietPlans = allDietPlans.filter(plan => plan.customerId === user.id && plan.isActive);
      setDietPlans(userDietPlans);

      // Load workout plans  
      const allWorkoutPlans = JSON.parse(localStorage.getItem('gymWorkoutPlans') || '[]');
      const userWorkoutPlans = allWorkoutPlans.filter(plan => plan.customerId === user.id && plan.isActive);
      setWorkoutPlans(userWorkoutPlans);

      // Load recent progress
      const allProgress = JSON.parse(localStorage.getItem('gymProgress') || '[]');
      const userProgress = allProgress
        .filter(progress => progress.customerId === user.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      setRecentProgress(userProgress);
    }
  }, [user]);

  const bmi = profile ? calculateBMI(profile.weightKg, profile.heightCm) : null;
  const bmiCategory = getBMICategory(bmi);
  const bmiColor = getBMIColor(bmiCategory);

  const getGoalDisplay = (goal) => {
    const goals = {
      'lose_weight': 'Lose Weight',
      'gain_muscle': 'Gain Muscle', 
      'maintain': 'Maintain Weight',
      'endurance': 'Build Endurance',
      'strength': 'Build Strength'
    };
    return goals[goal] || goal;
  };

  const getActivityLevelDisplay = (level) => {
    const levels = {
      'sedentary': 'Sedentary (little to no exercise)',
      'lightly_active': 'Lightly Active (light exercise 1-3 days/week)',
      'moderately_active': 'Moderately Active (moderate exercise 3-5 days/week)',
      'very_active': 'Very Active (hard exercise 6-7 days/week)',
      'extremely_active': 'Extremely Active (very hard exercise, physical job)'
    };
    return levels[level] || level;
  };

  return (
    <main className="container fade-in-up">
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        color: '#667eea' 
      }}>
        🏠 Welcome, {user.firstName}!
      </h1>

      {/* Profile Overview */}
      <div className="card">
        <h2 style={{ color: '#f093fb', marginBottom: '20px' }}>👤 Your Profile</h2>
        
        {!profile ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Complete your profile to get personalized recommendations!
            </p>
            <Link to="/profile/edit" className="btn btn-primary">
              ✏️ Complete Profile
            </Link>
          </div>
        ) : (
          <>
            <div className="profile-info">
              <div className="info-item">
                <div className="info-label">Age</div>
                <div className="info-value">{profile.age || 'Not set'}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Height</div>
                <div className="info-value">
                  {profile.heightCm ? `${profile.heightCm} cm` : 'Not set'}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Weight</div>
                <div className="info-value">
                  {profile.weightKg ? `${profile.weightKg} kg` : 'Not set'}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">BMI</div>
                <div className="info-value">
                  {bmi ? (
                    <>
                      {bmi}
                      <span className={`bmi-indicator bmi-${bmiColor}`}>
                        {bmiCategory}
                      </span>
                    </>
                  ) : (
                    'Not calculated'
                  )}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Goal</div>
                <div className="info-value">
                  {profile.goal ? getGoalDisplay(profile.goal) : 'Not set'}
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Activity Level</div>
                <div className="info-value">
                  {profile.activityLevel ? getActivityLevelDisplay(profile.activityLevel) : 'Not set'}
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <Link className="btn btn-primary" to="/profile/edit">
                ✏️ Edit Profile
              </Link>
              <Link className="btn btn-secondary" to="/progress/add" style={{ marginLeft: '15px' }}>
                📈 Add Progress
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Diet Plans */}
      <div className="card">
        <h2 style={{ color: '#84fab0', marginBottom: '20px' }}>🥗 Your Diet Plans</h2>
        {dietPlans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              No diet plans assigned yet. Your trainer will create personalized plans for you.
            </p>
          </div>
        ) : (
          <div className="grid">
            {dietPlans.map(plan => (
              <div key={plan.id} className="card" style={{ marginBottom: '0' }}>
                <h3 style={{ color: '#667eea', marginBottom: '10px' }}>{plan.title}</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>{plan.description}</p>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>
                  <p><strong>Target Calories:</strong> {plan.caloriesTarget || 'Not set'}</p>
                  <p><strong>Protein Target:</strong> {plan.proteinTarget ? `${plan.proteinTarget}g` : 'Not set'}</p>
                  <p><strong>Water Intake:</strong> {plan.waterIntake || 'Not set'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workout Plans */}
      <div className="card">
        <h2 style={{ color: '#ffecd2', marginBottom: '20px' }}>💪 Your Workout Plans</h2>
        {workoutPlans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              No workout plans assigned yet. Your trainer will create personalized workout routines for you.
            </p>
          </div>
        ) : (
          <div className="grid">
            {workoutPlans.map(plan => (
              <div key={plan.id} className="card" style={{ marginBottom: '0' }}>
                <h3 style={{ color: '#667eea', marginBottom: '10px' }}>{plan.title}</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>{plan.description}</p>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>
                  <p><strong>Duration:</strong> {plan.durationWeeks} weeks</p>
                  <p><strong>Created:</strong> {new Date(plan.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Progress */}
      <div className="card">
        <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📈 Recent Progress</h2>
        {recentProgress.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              No progress records yet. Start tracking your progress today!
            </p>
            <Link to="/progress/add" className="btn btn-secondary">
              📈 Add First Progress Record
            </Link>
          </div>
        ) : (
          <div style={{ maxWidth: '600px' }}>
            {recentProgress.map(progress => (
              <div key={progress.id} style={{
                background: 'rgba(255,255,255,0.6)',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '15px',
                border: '1px solid rgba(30,30,30,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#161616' }}>
                    {progress.weightKg} kg
                  </span>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>
                    {new Date(progress.date).toLocaleDateString()}
                  </span>
                </div>
                {progress.notes && (
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                    {progress.notes}
                  </p>
                )}
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/progress/add" className="btn btn-secondary">
                📈 Add New Progress
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CustomerDashboard;