import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, MapPin, DollarSign, Home, Shield } from 'lucide-react';
import { marketInsights } from '../data/mockData';
import { formatPrice, formatNumber } from '../utils/format';

export const MarketInsightsPage: React.FC = () => {
  const totalListings = marketInsights.reduce((sum, insight) => sum + insight.totalListings, 0);
  const avgPriceChange = marketInsights.reduce((sum, insight) => sum + insight.priceChange, 0) / marketInsights.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Market Insights</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Comprehensive real estate market data and trends across Kenya's major cities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{formatNumber(totalListings)}</div>
                <div className="text-gray-600">Total Active Listings</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {avgPriceChange > 0 ? '+' : ''}{avgPriceChange.toFixed(1)}%
                </div>
                <div className="text-gray-600">Average Price Change</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{marketInsights.length}</div>
                <div className="text-gray-600">Areas Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Insights Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {marketInsights.map((insight) => (
            <div
              key={insight.area}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6 text-orange-400" />
                    <h3 className="text-2xl font-bold">{insight.area}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {insight.priceChange > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`text-lg font-semibold ${
                      insight.priceChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {insight.priceChange > 0 ? '+' : ''}{insight.priceChange}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Price Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-sm text-orange-600 font-medium mb-1">Average Rent</div>
                    <div className="text-2xl font-bold text-orange-700">
                      {formatPrice(insight.averageRentPrice)}
                    </div>
                    <div className="text-sm text-orange-600">/month</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="text-sm text-emerald-600 font-medium mb-1">Average Sale</div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {formatPrice(insight.averageSalePrice)}
                    </div>
                    <div className="text-sm text-emerald-600">total</div>
                  </div>
                </div>

                {/* Price per sqm */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium mb-1">Price per m²</div>
                  <div className="text-xl font-bold text-blue-700">
                    {formatPrice(insight.pricePerSqm)}
                  </div>
                </div>

                {/* Amenity Scores */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Area Quality Score</h4>
                  <div className="space-y-3">
                    {Object.entries(insight.amenityScores).map(([amenity, score]) => (
                      <div key={amenity} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {amenity}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full"
                              style={{ width: `${score * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-8">
                            {score}/10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Listings */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-gray-600">Active Listings</span>
                  <span className="text-xl font-bold text-gray-900">
                    {formatNumber(insight.totalListings)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Market Trends</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Westlands shows the highest price growth at 7.1% year-over-year</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Home className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>Karen maintains premium pricing with excellent amenity scores</span>
                </li>
                <li className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                  <span>Kilimani offers the best balance of price and accessibility</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Recommendations</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <DollarSign className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span>Consider Westlands for high-growth potential investments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                  <span>Karen offers stable, premium market conditions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />
                  <span>Kilimani provides strong rental yield opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};