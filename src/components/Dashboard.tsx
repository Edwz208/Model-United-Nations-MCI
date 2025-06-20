import React, { useState } from 'react';
import Navigation from './Navigation';
import ResolutionsPage from './ResolutionsPage';
import CountriesPage from './CountriesPage';
import ReviewPage from './ReviewPage';
import HomePage from './HomePage';

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Resolutions':
        return <ResolutionsPage />;
      case 'Countries':
        return <CountriesPage />;
      case 'Review':
        return <ReviewPage />;
      case 'Screen':
        return (
          <div className="text-center text-white mt-12">
            <h2 className="text-2xl mb-4">Screen Page</h2>
            <p>Coming soon...</p>
          </div>
        );
      default:
        return <HomePage userRole={userRole} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://ugc.same-assets.com/J28aXSWoRLLQdgQA-n7d5j1t1vb50IG9.jpeg)'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="relative z-10">
        <Navigation
          userRole={userRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={onLogout}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
