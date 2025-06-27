import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="w-64 space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700"></div>
        <div className="px-4 pb-4 -mt-8">
          <div className="flex flex-col items-center">
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-4 border-white mb-2"
            />
            <Link
              to="/profile"
              className="text-center hover:underline"
            >
              <h3 className="font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{user?.headline}</p>
            </Link>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Connections</span>
              <span className="text-blue-600 font-semibold">{user?.connections}</span>
            </div>
            <Link
              to="/network"
              className="text-xs text-blue-600 hover:underline mt-2 block"
            >
              Grow your network
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <div className="space-y-2">
            <Link
              to="/jobs"
              className="block text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              Job postings
            </Link>
            <Link
              to="/network"
              className="block text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              People you may know
            </Link>
            <Link
              to="/"
              className="block text-sm text-gray-600 hover:text-blue-600 hover:underline"
            >
              Groups
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Recent</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              React Developers Community
            </div>
            <div className="text-sm text-gray-600">
              Web Development Tips
            </div>
            <div className="text-sm text-gray-600">
              Tech Industry News
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;