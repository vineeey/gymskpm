import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { initializeMockData } from './utils/mockData';

// Components
import BackgroundSlideshow from './components/BackgroundSlideshow';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import SignupCustomer from './components/Auth/SignupCustomer';
import SignupTrainer from './components/Auth/SignupTrainer';
import Dashboard from './components/Dashboard/Dashboard';
import ProfileEdit from './components/Profile/ProfileEdit';
import AddProgress from './components/Progress/AddProgress';

// Styles
import './styles/main.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <main className="container fade-in-up">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route component (redirect authenticated users)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <main className="container fade-in-up">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
  useEffect(() => {
    // Initialize mock data on app start
    initializeMockData();
  }, []);

  return (
    <div className="App">
      <BackgroundSlideshow />
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup/customer" 
          element={
            <PublicRoute>
              <SignupCustomer />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup/trainer" 
          element={
            <PublicRoute>
              <SignupTrainer />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile/edit" 
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/progress/add" 
          element={
            <ProtectedRoute>
              <AddProgress />
            </ProtectedRoute>
          } 
        />
        
        {/* Placeholder routes for trainer features */}
        <Route 
          path="/customers" 
          element={
            <ProtectedRoute>
              <main className="container">
                <div className="card">
                  <h1>👥 Customer Management</h1>
                  <p>Customer management functionality coming soon...</p>
                </div>
              </main>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
