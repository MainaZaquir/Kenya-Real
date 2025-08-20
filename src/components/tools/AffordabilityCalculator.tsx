import React, { useState, useEffect } from 'react';
import { Home, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatPrice, formatNumber } from '../../utils/format';

export const AffordabilityCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState('960000'); // 80k monthly
  const [monthlyDebts, setMonthlyDebts] = useState('15000');
  const [downPayment, setDownPayment] = useState('500000');
  const [interestRate, setInterestRate] = useState('12.5');
  const [loanTerm, setLoanTerm] = useState('20');
  const [maxPrice, setMaxPrice] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(0);

  useEffect(() => {
    const calculateAffordability = () => {
      const income = parseFloat(annualIncome) || 0;
      const debts = parseFloat(monthlyDebts) || 0;
      const down = parseFloat(downPayment) || 0;
      const rate = (parseFloat(interestRate) || 0) / 100 / 12;
      const term = (parseFloat(loanTerm) || 0) * 12;

      const monthlyIncome = income / 12;
      const maxMonthlyPayment = monthlyIncome * 0.28; // 28% rule
      const availableForHousing = maxMonthlyPayment - debts;

      if (availableForHousing <= 0 || rate <= 0 || term <= 0) {
        setMaxPrice(0);
        setMonthlyPayment(0);
        setDebtToIncomeRatio(0);
        return;
      }

      // Calculate maximum loan amount
      const maxLoanAmount = availableForHousing * (1 - Math.pow(1 + rate, -term)) / rate;
      const maxPropertyPrice = maxLoanAmount + down;

      setMaxPrice(maxPropertyPrice);
      setMonthlyPayment(availableForHousing);
      setDebtToIncomeRatio((debts / monthlyIncome) * 100);
    };

    calculateAffordability();
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm]);

  const getAffordabilityStatus = () => {
    if (debtToIncomeRatio > 36) return { status: 'poor', color: 'text-red-600', message: 'High debt-to-income ratio' };
    if (debtToIncomeRatio > 28) return { status: 'fair', color: 'text-yellow-600', message: 'Moderate debt-to-income ratio' };
    return { status: 'good', color: 'text-green-600', message: 'Good debt-to-income ratio' };
  };

  const affordabilityStatus = getAffordabilityStatus();

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Home Affordability Calculator
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Determine how much house you can afford based on your income and debts
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Calculator Form */}
            <div className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial Details</h3>
              
              <Input
                label="Annual Income (KES)"
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                placeholder="960,000"
              />
              
              <Input
                label="Monthly Debt Payments (KES)"
                type="number"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(e.target.value)}
                placeholder="15,000"
              />
              
              <Input
                label="Down Payment Available (KES)"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="500,000"
              />
              
              <Input
                label="Interest Rate (%)"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="12.5"
              />
              
              <Input
                label="Loan Term (Years)"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="20"
              />

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Affordability Guidelines:</div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>• Housing costs should not exceed 28% of income</div>
                  <div>• Total debt should not exceed 36% of income</div>
                  <div>• Consider property taxes and insurance</div>
                  <div>• Maintain emergency fund for 3-6 months</div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8">
              <h3 className="text-xl font-semibold mb-6">Affordability Analysis</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Home className="w-5 h-5 text-purple-200" />
                    <span className="text-sm text-purple-100">Maximum Home Price</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(maxPrice)}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-200" />
                    <span className="text-sm text-purple-100">Max Monthly Payment</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatPrice(monthlyPayment)}
                  </div>
                  <div className="text-sm text-purple-100">including taxes & insurance</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-100">Monthly Income:</span>
                    <span className="font-medium">{formatPrice(parseFloat(annualIncome) / 12)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Current Debts:</span>
                    <span className="font-medium">{formatPrice(parseFloat(monthlyDebts))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Down Payment:</span>
                    <span className="font-medium">{formatPrice(parseFloat(downPayment))}</span>
                  </div>
                  <div className="flex justify-between border-t border-purple-400 pt-2">
                    <span className="text-purple-100">Debt-to-Income:</span>
                    <span className={`font-medium ${affordabilityStatus.color.replace('text-', 'text-white')}`}>
                      {debtToIncomeRatio.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  affordabilityStatus.status === 'good' ? 'bg-green-500/20' : 
                  affordabilityStatus.status === 'fair' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                }`}>
                  <div className="text-sm">
                    <span className="text-white">
                      {affordabilityStatus.status === 'good' ? '✓' : 
                       affordabilityStatus.status === 'fair' ? '⚠' : '⚠'} {affordabilityStatus.message}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
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