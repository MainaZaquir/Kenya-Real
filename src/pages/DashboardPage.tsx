import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Home, Heart, Users, Shield, Plus, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockProperties } from '../data/mockData';
import { formatPrice } from '../utils/format';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  const savedProperties = mockProperties.filter(p => user.savedProperties.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <span className="capitalize">{user.role} Dashboard</span>
                {user.role === 'agent' && <Shield className="w-4 h-4 text-emerald-600" />}
              </p>
            </div>
            {user.role === 'agent' && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'buyer' && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{user.savedProperties.length}</div>
                    <div className="text-gray-600">Saved Properties</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-gray-600">Property Views</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {user.role === 'agent' && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-gray-600">Active Listings</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">45</div>
                    <div className="text-gray-600">Total Views</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {user.role === 'admin' && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1,234</div>
                    <div className="text-gray-600">Total Users</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">89</div>
                    <div className="text-gray-600">Verified Agents</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content based on user role */}
        {user.role === 'buyer' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Saved Properties</h3>
              {savedProperties.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-4">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                      <p className="text-orange-600 font-bold">{formatPrice(property.price, property.currency)}</p>
                      <p className="text-sm text-gray-600">{property.location.area}, {property.location.county}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No saved properties yet</p>
                  <Button className="mt-4">Browse Properties</Button>
                </div>
              )}
            </div>
          </div>
        )}

        {user.role === 'agent' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Your Listings</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Property
                </Button>
              </div>
              <div className="text-center py-8">
                <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No properties listed yet</p>
                <p className="text-sm text-gray-500 mb-4">Start by adding your first property listing</p>
                <Button>Add Your First Property</Button>
              </div>
            </div>
          </div>
        )}

        {user.role === 'admin' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Admin Overview</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">New agent registration</span>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Property reported</span>
                      <Badge variant="error">Review</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">System Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Properties:</span>
                      <span className="font-medium">456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Agents:</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Verifications:</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};