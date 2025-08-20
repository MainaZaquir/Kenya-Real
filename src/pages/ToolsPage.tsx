import React from 'react';
import { Calculator, PiggyBank, TrendingUp, Home, BarChart3 } from 'lucide-react';
import { MortgageCalculator } from '../components/tools/MortgageCalculator';
import { RentCalculator } from '../components/tools/RentCalculator';
import { AffordabilityCalculator } from '../components/tools/AffordabilityCalculator';
import { ROICalculator } from '../components/tools/ROICalculator';

export const ToolsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Property Tools</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Smart calculators and tools to help you make informed property decisions in Kenya
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tools Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mortgage Calculator</h3>
            <p className="text-gray-600 text-sm">Calculate monthly payments and total interest</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rent Calculator</h3>
            <p className="text-gray-600 text-sm">Determine affordable rent based on income</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordability</h3>
            <p className="text-gray-600 text-sm">Check what you can afford to buy</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI Calculator</h3>
            <p className="text-gray-600 text-sm">Calculate return on investment potential</p>
          </div>
        </div>

        {/* Mortgage Calculator */}
        <div className="mb-12">
          <MortgageCalculator />
        </div>

        {/* Rent Calculator */}
        <div className="mb-12">
          <RentCalculator />
        </div>

        {/* Affordability Calculator */}
        <div className="mb-12">
          <AffordabilityCalculator />
        </div>

        {/* ROI Calculator */}
        <div className="mb-12">
          <ROICalculator />
        </div>
      </div>
    </div>
  );
};