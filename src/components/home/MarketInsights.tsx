import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart3, MapPin } from 'lucide-react';
import { marketInsights } from '../../data/mockData';
import { formatPrice, formatNumber } from '../../utils/format';
import { Button } from '../ui/Button';

export const MarketInsights: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Market Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time market data and trends across Kenya's major cities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketInsights.map((insight) => (
            <div
              key={insight.area}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{insight.area}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  {insight.priceChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    insight.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {insight.priceChange > 0 ? '+' : ''}{insight.priceChange}%
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Avg. Rent</div>
                    <div className="text-lg font-semibold text-orange-600">
                      {formatPrice(insight.averageRentPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Avg. Sale</div>
                    <div className="text-lg font-semibold text-emerald-600">
                      {formatPrice(insight.averageSalePrice)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Area Score</div>
                  <div className="grid grid-cols-5 gap-1">
                    {Object.entries(insight.amenityScores).map(([amenity, score]) => (
                      <div key={amenity} className="text-center">
                        <div className="text-xs text-gray-400 capitalize mb-1">
                          {amenity.slice(0, 3)}
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full"
                            style={{ width: `${score * 10}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-medium mt-1">{score}/10</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Active Listings</span>
                  <span className="font-medium">{formatNumber(insight.totalListings)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/market-insights')}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View Full Market Report
          </Button>
        </div>
      </div>
    </section>
  );
};