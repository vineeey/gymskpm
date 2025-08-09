import React from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerDashboard from './CustomerDashboard';
import TrainerDashboard from './TrainerDashboard';

const Dashboard = () => {
  const { user, isTrainer } = useAuth();

  if (!user) {
    return (
      <main className="container fade-in-up">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return isTrainer ? <TrainerDashboard /> : <CustomerDashboard />;
};

export default Dashboard;