import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import Feed from '../components/Feed/Feed';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="flex-1 flex justify-center">
            <Feed />
          </div>
          <div className="hidden xl:block w-80">
            {/* Right sidebar for news/ads */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">LinkedIn News</h3>
              <div className="space-y-3">
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Tech industry trends</h4>
                  <p className="text-xs text-gray-600">1,234 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Remote work policies</h4>
                  <p className="text-xs text-gray-600">987 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">AI developments</h4>
                  <p className="text-xs text-gray-600">2,156 readers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;