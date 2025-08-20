import React, { useState, useEffect } from 'react';
import { PiggyBank, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatPrice, formatNumber } from '../../utils/format';

export const RentCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('80000');
  const [otherExpenses, setOtherExpenses] = useState('25000');
  const [rentPercentage, setRentPercentage] = useState('30');
  const [maxRent, setMaxRent] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(0);

  useEffect(() => {
    const calculateRent = () => {
      const income = parseFloat(monthlyIncome) || 0;
      const expenses = parseFloat(otherExpenses) || 0;
      const percentage = parseFloat(rentPercentage) || 30;

      const maxAffordableRent = (income * percentage) / 100;
      const remaining = income - maxAffordableRent - expenses;

      setMaxRent(maxAffordableRent);
      setRemainingIncome(remaining);
    };

    calculateRent();
  }, [monthlyIncome, otherExpenses, rentPercentage]);

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PiggyBank className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Rent Affordability Calculator
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Determine how much rent you can comfortably afford based on your income
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Calculator Form */}
            <div className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Income Details</h3>
              
              <Input
                label="Monthly Income (KES)"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="80,000"
              />
              
              <Input
                label="Other Monthly Expenses (KES)"
                type="number"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(e.target.value)}
                placeholder="25,000"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Percentage of Income (%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="40"
                  value={rentPercentage}
                  onChange={(e) => setRentPercentage(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>20%</span>
                  <span className="font-medium text-orange-600">{rentPercentage}%</span>
                  <span>40%</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Recommended guidelines:</div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>• 30% rule: Rent should not exceed 30% of income</div>
                  <div>• Include utilities, parking, and service charges</div>
                  <div>• Consider emergency fund requirements</div>
                  <div>• Factor in transportation costs to work</div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-8">
              <h3 className="text-xl font-semibold mb-6">Affordability Summary</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <PiggyBank className="w-5 h-5 text-emerald-200" />
                    <span className="text-sm text-emerald-100">Maximum Affordable Rent</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(maxRent)}
                  </div>
                  <div className="text-sm text-emerald-100">per month</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-emerald-200" />
                    <span className="text-sm text-emerald-100">Remaining Income</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatPrice(remainingIncome)}
                  </div>
                  <div className="text-sm text-emerald-100">after rent & expenses</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-100">Monthly Income:</span>
                    <span className="font-medium">{formatPrice(parseFloat(monthlyIncome))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-100">Rent ({rentPercentage}%):</span>
                    <span className="font-medium">{formatPrice(maxRent)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-100">Other Expenses:</span>
                    <span className="font-medium">{formatPrice(parseFloat(otherExpenses))}</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-400 pt-2">
                    <span className="text-emerald-100">Available:</span>
                    <span className="font-medium">{formatPrice(remainingIncome)}</span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  remainingIncome > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  <div className="text-sm">
                    {remainingIncome > 0 ? (
                      <span className="text-green-100">✓ This rent is affordable for your income</span>
                    ) : (
                      <span className="text-red-100">⚠ This rent may strain your budget</span>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50">
                  Find Properties in Budget
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};