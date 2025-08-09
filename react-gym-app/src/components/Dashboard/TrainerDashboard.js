import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { calculateBMI, getBMICategory, getBMIColor, getUserProfile } from '../../utils/mockData';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [recentPlans, setRecentPlans] = useState([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeDietPlans: 0,
    activeWorkoutPlans: 0
  });

  useEffect(() => {
    if (user) {
      // Load customers (users with customer type)
      const allUsers = JSON.parse(localStorage.getItem('gymUsers') || '[]');
      const customerUsers = allUsers.filter(u => u.userType === 'customer');
      
      // Add profile data to customers
      const customersWithProfiles = customerUsers.map(customer => {
        const profile = getUserProfile(customer.id);
        return {
          ...customer,
          profile: profile
        };
      });
      
      setCustomers(customersWithProfiles);

      // Load recent diet plans created by this trainer
      const allDietPlans = JSON.parse(localStorage.getItem('gymDietPlans') || '[]');
      const trainerPlans = allDietPlans
        .filter(plan => plan.trainerId === user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentPlans(trainerPlans);

      // Calculate stats
      const allWorkoutPlans = JSON.parse(localStorage.getItem('gymWorkoutPlans') || '[]');
      const trainerDietPlans = allDietPlans.filter(plan => plan.trainerId === user.id && plan.isActive);
      const trainerWorkoutPlans = allWorkoutPlans.filter(plan => plan.trainerId === user.id && plan.isActive);

      setStats({
        totalCustomers: customerUsers.length,
        activeDietPlans: trainerDietPlans.length,
        activeWorkoutPlans: trainerWorkoutPlans.length
      });
    }
  }, [user]);

  const getCustomerWithProfile = (customerId) => {
    return customers.find(c => c.id === customerId);
  };

  return (
    <main className="container fade-in-up">
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        color: '#667eea' 
      }}>
        💼 Trainer Dashboard - Welcome, {user.firstName}!
      </h1>

      {/* Stats Overview */}
      <div className="grid-3" style={{ marginBottom: '30px' }}>
        <div className="stats-card">
          <div className="stats-number">{stats.totalCustomers}</div>
          <div className="stats-label">Total Customers</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.activeDietPlans}</div>
          <div className="stats-label">Active Diet Plans</div>
        </div>
        <div className="stats-card">
          <div className="stats-number">{stats.activeWorkoutPlans}</div>
          <div className="stats-label">Active Workout Plans</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 style={{ color: '#f093fb', marginBottom: '20px' }}>⚡ Quick Actions</h2>
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link to="/customers" className="btn btn-primary">
            👥 View All Customers
          </Link>
          <Link to="/diet-plan/create" className="btn btn-success">
            🥗 Create Diet Plan
          </Link>
          <Link to="/workout-plan/create" className="btn btn-warning">
            💪 Create Workout Plan
          </Link>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="card">
        <h2 style={{ color: '#84fab0', marginBottom: '20px' }}>👥 Recent Customers</h2>
        {customers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666' }}>No customers registered yet.</p>
          </div>
        ) : (
          <div className="grid">
            {customers.slice(0, 6).map(customer => {
              const bmi = customer.profile ? calculateBMI(customer.profile.weightKg, customer.profile.heightCm) : null;
              const bmiCategory = getBMICategory(bmi);
              const bmiColor = getBMIColor(bmiCategory);
              
              return (
                <div key={customer.id} className="card" style={{ marginBottom: '0' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '10px' }}>
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <p><strong>Email:</strong> {customer.email}</p>
                    {customer.profile ? (
                      <>
                        <p><strong>Age:</strong> {customer.profile.age || 'Not set'}</p>
                        <p><strong>Weight:</strong> {customer.profile.weightKg ? `${customer.profile.weightKg} kg` : 'Not set'}</p>
                        {bmi && (
                          <p>
                            <strong>BMI:</strong> {bmi}{' '}
                            <span className={`bmi-indicator bmi-${bmiColor}`}>
                              {bmiCategory}
                            </span>
                          </p>
                        )}
                        <p><strong>Goal:</strong> {customer.profile.goal || 'Not set'}</p>
                      </>
                    ) : (
                      <p style={{ color: '#f57c00', fontStyle: 'italic' }}>Profile incomplete</p>
                    )}
                  </div>
                  <div style={{ marginTop: '15px' }}>
                    <Link 
                      to={`/customer/${customer.id}`} 
                      className="btn btn-primary"
                      style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {customers.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/customers" className="btn btn-secondary">
              View All Customers
            </Link>
          </div>
        )}
      </div>

      {/* Recent Diet Plans */}
      <div className="card">
        <h2 style={{ color: '#ffecd2', marginBottom: '20px' }}>🥗 Recent Diet Plans</h2>
        {recentPlans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              No diet plans created yet.
            </p>
            <Link to="/diet-plan/create" className="btn btn-success">
              🥗 Create First Diet Plan
            </Link>
          </div>
        ) : (
          <div style={{ maxWidth: '800px' }}>
            {recentPlans.map(plan => {
              const customer = getCustomerWithProfile(plan.customerId);
              
              return (
                <div key={plan.id} style={{
                  background: 'rgba(255,255,255,0.6)',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(30,30,30,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ color: '#667eea', margin: '0 0 5px 0' }}>{plan.title}</h4>
                      <p style={{ color: '#666', fontSize: '0.9rem', margin: '0' }}>
                        For: {customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer'}
                      </p>
                    </div>
                    <span style={{ color: '#888', fontSize: '0.9rem' }}>
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                    {plan.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: '#888' }}>
                    <span><strong>Calories:</strong> {plan.caloriesTarget || 'Not set'}</span>
                    <span><strong>Protein:</strong> {plan.proteinTarget ? `${plan.proteinTarget}g` : 'Not set'}</span>
                    <span><strong>Status:</strong> {plan.isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              );
            })}
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/diet-plans" className="btn btn-secondary">
                View All Diet Plans
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Trainer Profile Info */}
      <div className="card">
        <h2 style={{ color: '#667eea', marginBottom: '20px' }}>👨‍⚕️ Your Profile</h2>
        <div className="profile-info">
          <div className="info-item">
            <div className="info-label">Name</div>
            <div className="info-value">{user.firstName} {user.lastName}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Email</div>
            <div className="info-value">{user.email}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Username</div>
            <div className="info-value">{user.username}</div>
          </div>
          {user.specialization && (
            <div className="info-item">
              <div className="info-label">Specialization</div>
              <div className="info-value">{user.specialization}</div>
            </div>
          )}
          {user.experience && (
            <div className="info-item">
              <div className="info-label">Experience</div>
              <div className="info-value">{user.experience}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TrainerDashboard;