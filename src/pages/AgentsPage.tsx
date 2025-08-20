import React, { useState } from 'react';
import { Search, Star, Shield, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { mockAgents } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const AgentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const filteredAgents = mockAgents.filter(agent => {
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !agent.company.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSpecialty && !agent.specialties.includes(selectedSpecialty)) {
      return false;
    }
    return true;
  });

  const allSpecialties = Array.from(new Set(mockAgents.flatMap(agent => agent.specialties)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Verified Agents</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with trusted, verified real estate professionals across Kenya
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agents or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Specialties</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredAgents.length} verified agents found
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-emerald-500 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-semibold">{agent.name}</h3>
                      {agent.verified && (
                        <Shield className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <span className="font-medium">{agent.rating}</span>
                      <span className="text-white/80">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{agent.company}</h4>
                  <p className="text-sm text-gray-600">License: {agent.license}</p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {agent.bio}
                </p>

                {/* Specialties */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" size="sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{agent.email}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:${agent.email}`)}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open(`https://wa.me/${agent.whatsapp.replace('+', '')}`)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};