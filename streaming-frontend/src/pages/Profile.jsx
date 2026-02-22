import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, Settings, LogOut, Edit2, Check, X } from 'lucide-react';
import { authAPI } from '../services/api';

const Profile = () => {
  const currentUser = authAPI.getCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: 'Passionate movie enthusiast and streaming platform user.',
  });
  const [saveStatus, setSaveStatus] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setSaveStatus('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      bio: 'Passionate movie enthusiast and streaming platform user.',
    });
    setSaveStatus('');
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    setSaveStatus('Profile updated successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleLogout = () => {
    authAPI.logout();
    window.location.href = '/';
  };

  const stats = [
    { label: 'Movies Watched', value: '127' },
    { label: 'Hours Watched', value: '256' },
    { label: 'Favorite Genre', value: 'Action' },
    { label: 'Member Since', value: 'Jan 2024' },
  ];

  const recentActivity = [
    { type: 'watched', movie: 'Inception', time: '2 hours ago' },
    { type: 'added', movie: 'The Dark Knight', time: '1 day ago' },
    { type: 'rated', movie: 'Interstellar', time: '3 days ago' },
    { type: 'watched', movie: 'The Matrix', time: '1 week ago' },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please sign in</h2>
          <p className="text-gray-400 mb-6">You need to be signed in to view your profile</p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your account and viewing preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-netflix-red rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                    />
                  ) : (
                    formData.name
                  )}
                </h2>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-netflix-red"
                      />
                    ) : (
                      formData.email
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                    title="Save"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                    title="Cancel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  title="Edit Profile"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Bio</h3>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-netflix-red resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-300">{formData.bio}</p>
            )}
          </div>

          {/* Save Status */}
          {saveStatus && (
            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-2 rounded">
              {saveStatus}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-netflix-red mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'watched' ? 'bg-green-500' :
                    activity.type === 'added' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="text-white text-sm">
                      {activity.type === 'watched' && 'Watched '}
                      {activity.type === 'added' && 'Added to watchlist '}
                      {activity.type === 'rated' && 'Rated '}
                      <span className="font-medium">{activity.movie}</span>
                    </p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-white">Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-netflix-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-white">Autoplay Trailers</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-netflix-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-netflix-red"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="btn-secondary flex items-center space-x-2 mx-auto"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
