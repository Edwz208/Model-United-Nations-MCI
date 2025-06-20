import React, { useState } from 'react';
import { Country } from '../types';

const countriesData: Country[] = [
  { id: 1, name: 'Afghanistan', amendmentCount: 1 },
  { id: 2, name: 'Algeria', amendmentCount: 4 },
  { id: 3, name: 'Armenia', amendmentCount: 0 },
  { id: 4, name: 'Australia', amendmentCount: 3 },
  { id: 5, name: 'Bangladesh', amendmentCount: 0 },
  { id: 6, name: 'Belgium', amendmentCount: 1 },
  { id: 7, name: 'Brazil', amendmentCount: 7 },
  { id: 8, name: 'Canada', amendmentCount: 3 },
  { id: 9, name: 'Costa Rica', amendmentCount: 2 },
  { id: 10, name: 'Czech Republic', amendmentCount: 3 },
  { id: 11, name: "Democratic People's Republic of Korea", amendmentCount: 0 },
  { id: 12, name: 'Denmark', amendmentCount: 5 },
  { id: 13, name: 'United States of America', amendmentCount: 3 },
  { id: 14, name: 'Vietnam', amendmentCount: 0 },
];

const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>(countriesData);

  const handleCreateNewCountry = () => {
    const newId = Math.max(...countries.map(c => c.id)) + 1;
    const newCountry: Country = {
      id: newId,
      name: `New Country ${newId}`,
      amendmentCount: 0
    };
    setCountries([...countries, newCountry]);
  };

  return (
    <div className="bg-white bg-opacity-95 mx-4 my-6 rounded-lg shadow-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Country Name</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Amendment Count</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                    onClick={() => alert(`Opening details for ${country.name}`)}
                  >
                    {country.name}
                  </button>
                </td>
                <td className="py-3 px-2 text-gray-700">
                  {country.amendmentCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button
          onClick={handleCreateNewCountry}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-150"
        >
          + Create New Country
        </button>
      </div>
    </div>
  );
};

export default CountriesPage;
