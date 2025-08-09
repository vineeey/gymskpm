import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gymUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('gymUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('gymUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gymUser');
    localStorage.removeItem('gymProfiles');
    localStorage.removeItem('gymDietPlans');
    localStorage.removeItem('gymWorkoutPlans');
    localStorage.removeItem('gymProgress');
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...user, profile: profileData };
    setUser(updatedUser);
    localStorage.setItem('gymUser', JSON.stringify(updatedUser));
    
    // Also update in profiles storage
    const profiles = JSON.parse(localStorage.getItem('gymProfiles') || '[]');
    const profileIndex = profiles.findIndex(p => p.userId === user.id);
    if (profileIndex >= 0) {
      profiles[profileIndex] = { ...profileData, userId: user.id };
    } else {
      profiles.push({ ...profileData, userId: user.id });
    }
    localStorage.setItem('gymProfiles', JSON.stringify(profiles));
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isTrainer: user?.userType === 'trainer',
    isCustomer: user?.userType === 'customer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};