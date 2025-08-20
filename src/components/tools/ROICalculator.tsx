import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calculator, BarChart3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatPrice, formatNumber } from '../../utils/format';

export const ROICalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState('3000000');
  const [downPayment, setDownPayment] = useState('600000');
  const [monthlyRent, setMonthlyRent] = useState('55000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('8000');
  const [annualAppreciation, setAnnualAppreciation] = useState('5');
  const [holdingPeriod, setHoldingPeriod] = useState('5');
  
  const [monthlyROI, setMonthlyROI] = useState(0);
  const [annualROI, setAnnualROI] = useState(0);
  const [totalROI, setTotalROI] = useState(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState(0);

  useEffect(() => {
    const calculateROI = () => {
      const price = parseFloat(purchasePrice) || 0;
      const down = parseFloat(downPayment) || 0;
      const rent = parseFloat(monthlyRent) || 0;
      const expenses = parseFloat(monthlyExpenses) || 0;
      const appreciation = (parseFloat(annualAppreciation) || 0) / 100;
      const years = parseFloat(holdingPeriod) || 0;

      if (price <= 0 || down <= 0) {
        setMonthlyROI(0);
        setAnnualROI(0);
        setTotalROI(0);
        setCashOnCashReturn(0);
        return;
      }

      // Monthly cash flow
      const monthlyCashFlow = rent - expenses;
      const monthlyROICalc = (monthlyCashFlow / down) * 100;

      // Annual cash flow
      const annualCashFlow = monthlyCashFlow * 12;
      const annualROICalc = (annualCashFlow / down) * 100;

      // Cash-on-cash return
      const cashOnCashCalc = (annualCashFlow / down) * 100;

      // Total ROI including appreciation
      const futureValue = price * Math.pow(1 + appreciation, years);
      const totalAppreciation = futureValue - price;
      const totalCashFlow = annualCashFlow * years;
      const totalReturn = totalAppreciation + totalCashFlow;
      const totalROICalc = (totalReturn / down) * 100;

      setMonthlyROI(monthlyROICalc);
      setAnnualROI(annualROICalc);
      setTotalROI(totalROICalc);
      setCashOnCashReturn(cashOnCashCalc);
    };

    calculateROI();
  }, [purchasePrice, downPayment, monthlyRent, monthlyExpenses, annualAppreciation, holdingPeriod]);

  const getROIStatus = (roi: number) => {
    if (roi >= 15) return { status: 'excellent', color: 'text-green-600', message: 'Excellent investment' };
    if (roi >= 10) return { status: 'good', color: 'text-emerald-600', message: 'Good investment' };
    if (roi >= 5) return { status: 'fair', color: 'text-yellow-600', message: 'Fair investment' };
    return { status: 'poor', color: 'text-red-600', message: 'Poor investment' };
  };

  const roiStatus = getROIStatus(annualROI);

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              ROI Calculator
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate return on investment for rental properties in Kenya
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Calculator Form */}
            <div className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment Details</h3>
              
              <Input
                label="Purchase Price (KES)"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="3,000,000"
              />
              
              <Input
                label="Down Payment (KES)"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="600,000"
              />
              
              <Input
                label="Monthly Rental Income (KES)"
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                placeholder="55,000"
              />
              
              <Input
                label="Monthly Expenses (KES)"
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                placeholder="8,000"
              />
              
              <Input
                label="Annual Appreciation (%)"
                type="number"
                step="0.1"
                value={annualAppreciation}
                onChange={(e) => setAnnualAppreciation(e.target.value)}
                placeholder="5"
              />
              
              <Input
                label="Holding Period (Years)"
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                placeholder="5"
              />

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Investment Guidelines:</div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>• Good ROI: 10-15% annually</div>
                  <div>• Include maintenance, taxes, vacancy</div>
                  <div>• Kenya property appreciation: 3-7%</div>
                  <div>• Consider location and market trends</div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8">
              <h3 className="text-xl font-semibold mb-6">Investment Analysis</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-200" />
                    <span className="text-sm text-blue-100">Annual ROI</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {annualROI.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-100">{roiStatus.message}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-200" />
                    <span className="text-sm text-blue-100">Monthly Cash Flow</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatPrice(parseFloat(monthlyRent) - parseFloat(monthlyExpenses))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-sm text-blue-100 mb-1">Cash-on-Cash</div>
                    <div className="text-lg font-bold">{cashOnCashReturn.toFixed(1)}%</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-sm text-blue-100 mb-1">Total ROI</div>
                    <div className="text-lg font-bold">{totalROI.toFixed(1)}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Initial Investment:</span>
                    <span className="font-medium">{formatPrice(parseFloat(downPayment))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Monthly Income:</span>
                    <span className="font-medium">{formatPrice(parseFloat(monthlyRent))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Monthly Expenses:</span>
                    <span className="font-medium">{formatPrice(parseFloat(monthlyExpenses))}</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-400 pt-2">
                    <span className="text-blue-100">Net Monthly:</span>
                    <span className="font-medium">{formatPrice(parseFloat(monthlyRent) - parseFloat(monthlyExpenses))}</span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${
                  roiStatus.status === 'excellent' || roiStatus.status === 'good' ? 'bg-green-500/20' : 
                  roiStatus.status === 'fair' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                }`}>
                  <div className="text-sm">
                    <span className="text-white">
                      {roiStatus.status === 'excellent' || roiStatus.status === 'good' ? '✓' : 
                       roiStatus.status === 'fair' ? '⚠' : '⚠'} {roiStatus.message}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Find Investment Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};