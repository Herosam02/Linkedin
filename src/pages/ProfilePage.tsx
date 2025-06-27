import React, { useState } from 'react';
import { Camera, MapPin, Plus, Edit2, Upload } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    location: user?.location || '',
    about: user?.about || ''
  });

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  const handleImageUpload = (type: 'profile' | 'banner') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          if (type === 'profile') {
            updateUser({ profileImage: imageUrl });
          } else {
            updateUser({ bannerImage: imageUrl });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          {/* Banner */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-700">
            {user?.bannerImage && (
              <img
                src={user.bannerImage}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            )}
            <button
              onClick={() => handleImageUpload('banner')}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all"
            >
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <div className="relative">
                <img
                  src={user?.profileImage}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                <button
                  onClick={() => handleImageUpload('profile')}
                  className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <Camera className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              <div className="mt-4 sm:mt-0 flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editData.headline}
                      onChange={(e) => setEditData({ ...editData, headline: e.target.value })}
                      className="text-lg text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                    <p className="text-lg text-gray-600 mt-1">{user?.headline}</p>
                    <div className="flex items-center space-x-1 text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user?.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit profile</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Add resume</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">About</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
          {user?.about ? (
            <p className="text-gray-700 whitespace-pre-wrap">{user.about}</p>
          ) : (
            <p className="text-gray-500 italic">Add a summary to highlight your personality or work experience</p>
          )}
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {user?.experience?.length ? (
            <div className="space-y-6">
              {user.experience.map((exp) => (
                <div key={exp.id} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {exp.company.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                    {exp.description && (
                      <p className="text-gray-700 mt-2">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Add your work experience to showcase your career journey</p>
          )}
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {user?.education?.length ? (
            <div className="space-y-6">
              {user.education.map((edu) => (
                <div key={edu.id} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {edu.school.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Add your educational background</p>
          )}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {user?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Add skills to showcase your expertise</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;