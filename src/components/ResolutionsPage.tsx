import React, { useState } from 'react';
import { Resolution } from '../types';

const resolutionsData: Resolution[] = [
  { id: 1, title: 'GA#001-Abortion Laws', status: 'Passed', amendmentCount: 22 },
  { id: 2, title: 'GA#002-Internet Safety Law', status: 'Failed', amendmentCount: 27 },
  { id: 3, title: 'GA#004-Climate Refugees', status: 'Passed', amendmentCount: 0 },
  { id: 4, title: 'GA#005-Death Penalty', status: 'Passed', amendmentCount: 21 },
  { id: 5, title: 'GA#006-Overconsumption', status: 'In Session', amendmentCount: 29 },
  { id: 6, title: 'GA#007-Global Water Crisis', status: 'Passed', amendmentCount: 18 },
  { id: 7, title: 'GA#008-Nuclear Energy', status: 'Passed', amendmentCount: 23 },
  { id: 8, title: 'Resolution9', status: 'Pending', amendmentCount: 14 },
  { id: 9, title: 'Resolution10', status: 'Pending', amendmentCount: 0 },
  { id: 10, title: 'GA#003-Israel-Hamas Conflict', status: 'Passed', amendmentCount: 0 },
];

const ResolutionsPage: React.FC = () => {
  const [resolutions, setResolutions] = useState<Resolution[]>(resolutionsData);

  const getStatusBadge = (status: Resolution['status']) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded";
    switch (status) {
      case 'Passed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'In Session':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleCreateNewResolution = () => {
    const newId = Math.max(...resolutions.map(r => r.id)) + 1;
    const newResolution: Resolution = {
      id: newId,
      title: `Resolution${newId}`,
      status: 'Pending',
      amendmentCount: 0
    };
    setResolutions([...resolutions, newResolution]);
  };

  return (
    <div className="bg-white bg-opacity-95 mx-4 my-6 rounded-lg shadow-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Resolution</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Amendment Count</th>
            </tr>
          </thead>
          <tbody>
            {resolutions.map((resolution) => (
              <tr key={resolution.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 hover:underline text-left"
                    onClick={() => alert(`Opening Resolution ${resolution.id}: ${resolution.title}`)}
                  >
                    Resolution {resolution.id}: {resolution.title}
                  </button>
                </td>
                <td className="py-3 px-2">
                  <span className={getStatusBadge(resolution.status)}>
                    {resolution.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-700">
                  {resolution.amendmentCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button
          onClick={handleCreateNewResolution}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-150"
        >
          + Create New Resolution
        </button>
      </div>
    </div>
  );
};

export default ResolutionsPage;
