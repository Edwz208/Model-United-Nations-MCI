import React from 'react';

interface NavigationProps {
  userRole: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ userRole, activeTab, onTabChange, onLogout }) => {
  const navItems = ['Home', 'Resolutions', 'Countries', 'Review', 'Screen'];

  return (
    <nav className="bg-gray-100 border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-3 sm:gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onTabChange(item)}
              className={`text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base ${
                activeTab === item ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-gray-600 text-xs sm:text-sm">
            Logged in as: <span className="font-medium text-blue-600">{userRole}</span>
          </span>
          <button
            onClick={onLogout}
            className="text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors self-start sm:self-auto"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
