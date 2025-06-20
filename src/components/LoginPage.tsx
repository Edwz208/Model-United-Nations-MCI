import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (accessCode: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(accessCode);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://ext.same-assets.com/2781358612/1461763539.jpeg)'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="text-center px-8 py-12">
          <h1 className="text-7xl md:text-8xl font-normal text-gray-800 mb-4 tracking-normal leading-none">
            MMUNx
          </h1>
          <p className="text-gray-700 mb-8 text-base">
            Please enter your access code
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
              />
              <small className="block text-xs text-gray-600 mt-2 text-left">
                Please see Tech Desk if you forgot your access code
              </small>
            </div>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 text-white font-normal py-2 px-4 rounded text-lg border-0 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150"
            >
              Log in
            </button>
          </form>
          <div className="mt-8">
            <small className="text-gray-600 text-xs">
              Created by{' '}
              <a
                href="http://www.jonathanlucki.ca"
                className="text-blue-600 hover:text-blue-800 no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jonathan Lucki
              </a>{' '}in 2018
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
