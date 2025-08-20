import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchBar } from '../common/SearchBar';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-emerald-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-emerald-600 block">
                  Kenyan Home
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover verified properties, trusted agents, and local market insights 
                across Kenya. From Nairobi apartments to coastal villas.
              </p>
            </div>

            {/* Search Form */}
            <SearchBar />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">50+</div>
                <div className="text-sm text-gray-600">Verified Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern Kenyan Home"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-sm text-gray-500">Average Price</div>
              <div className="text-lg font-bold text-orange-600">KES 4.2M</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="text-sm text-gray-500">New Listings</div>
              <div className="text-lg font-bold text-emerald-600">+25 Today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};