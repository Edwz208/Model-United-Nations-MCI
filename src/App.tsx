import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (accessCode: string) => {
    if (accessCode === 'mmun10') {
      setIsAuthenticated(true);
      setUserRole('ADMIN');
    } else {
      alert('Invalid access code. Try "mmun10" for demo purposes.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <>
      {isAuthenticated ? (
        <Dashboard userRole={userRole} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;