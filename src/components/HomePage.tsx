import React from 'react';

interface HomePageProps {
  userRole: string;
}

const HomePage: React.FC<HomePageProps> = ({ userRole }) => {
  return (
    <div className="flex items-center justify-center px-4" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-4 drop-shadow-lg">
          Welcome, {userRole.toLowerCase()}.
        </h1>
      </div>
    </div>
  );
};

export default HomePage;
