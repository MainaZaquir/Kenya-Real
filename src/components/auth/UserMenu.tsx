import React, { useState } from 'react';
import { User, Heart, Settings, LogOut, Shield, Home, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500 capitalize">{user.role}</div>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-20">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    {user.role === 'agent' && <Shield className="w-3 h-3 text-emerald-600" />}
                    <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2">
              {user.role === 'buyer' && (
                <>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Saved Properties</span>
                    <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                      {user.savedProperties.length}
                    </span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Preferences</span>
                  </button>
                </>
              )}

              {user.role === 'agent' && (
                <>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <Home className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">My Listings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Analytics</span>
                  </button>
                </>
              )}

              {user.role === 'admin' && (
                <>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Admin Dashboard</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Manage Users</span>
                  </button>
                </>
              )}

              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Account Settings</span>
              </button>
            </div>

            <div className="border-t py-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};