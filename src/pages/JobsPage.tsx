import React from 'react';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const JobsPage: React.FC = () => {
  const jobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2 days ago',
      logo: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      description: 'We are looking for a senior software engineer to join our growing team...',
      applicants: '50+ applicants'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'New York, NY',
      type: 'Full-time',
      posted: '1 week ago',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      description: 'Join our product team to help shape the future of our digital platform...',
      applicants: '25+ applicants'
    },
    {
      id: '3',
      title: 'UX Designer',
      company: 'Creative Studio',
      location: 'Remote',
      type: 'Contract',
      posted: '3 days ago',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      description: 'We are seeking a talented UX designer to create exceptional user experiences...',
      applicants: '15+ applicants'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Job type</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Full-time</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Part-time</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Contract</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Remote</span>
                </label>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Experience level</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Entry level</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Mid level</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Senior level</span>
                </label>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for you</h2>
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-12 h-12 rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                            {job.title}
                          </h3>
                          <p className="text-gray-900 font-medium">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.posted}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-3">{job.description}</p>
                          <p className="text-sm text-gray-500 mt-2">{job.applicants}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-3 mt-4">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        Apply
                      </button>
                      <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                        Save
                      </button>
                    </div>
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

export default JobsPage;