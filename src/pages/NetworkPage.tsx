import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import { mockUsers } from '../utils/mockData';

const NetworkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Manage my network</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Connections</span>
                  <span className="text-blue-600 font-semibold">500+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Following</span>
                  <span className="text-blue-600 font-semibold">123</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Followers</span>
                  <span className="text-blue-600 font-semibold">89</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">People you may know</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{user.headline}</p>
                      <button className="flex items-center justify-center space-x-2 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                        <UserPlus className="w-4 h-4" />
                        <span>Connect</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your connections</h2>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.headline}</p>
                      <p className="text-sm text-gray-500">{user.connections} connections</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;