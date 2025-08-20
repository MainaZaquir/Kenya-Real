import React, { useState, useEffect } from 'react';
import { Calculator, Home, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { formatPrice, formatNumber } from '../../utils/format';

export const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('3000000');
  const [interestRate, setInterestRate] = useState('12.5');
  const [loanTerm, setLoanTerm] = useState('20');
  const [downPayment, setDownPayment] = useState('600000');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const calculateMortgage = () => {
      const principal = parseFloat(loanAmount) || 0;
      const annualRate = (parseFloat(interestRate) || 0) / 100;
      const monthlyRate = annualRate / 12;
      const numPayments = (parseFloat(loanTerm) || 0) * 12;
      const down = parseFloat(downPayment) || 0;
      const loanPrincipal = principal - down;

      if (loanPrincipal <= 0 || monthlyRate <= 0 || numPayments <= 0) {
        setMonthlyPayment(0);
        setTotalInterest(0);
        return;
      }

      const monthlyPaymentCalc = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalAmount = monthlyPaymentCalc * numPayments;
      const totalInterestCalc = totalAmount - loanPrincipal;

      setMonthlyPayment(monthlyPaymentCalc);
      setTotalInterest(totalInterestCalc);
    };

    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Mortgage Calculator
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly mortgage payments and plan your home purchase in Kenya
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Calculator Form */}
            <div className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Loan Details</h3>
              
              <Input
                label="Property Price (KES)"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
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
                <div className="text-sm text-gray-600 mb-2">Typical Kenya rates:</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Commercial banks: 11-15%</div>
                  <div>Microfinance: 15-20%</div>
                  <div>Mortgage companies: 10-14%</div>
                  <div>Down payment: 10-20%</div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
              <h3 className="text-xl font-semibold mb-6">Payment Summary</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Home className="w-5 h-5 text-orange-400" />
                    <span className="text-sm text-gray-300">Monthly Payment</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(monthlyPayment)}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-gray-300">Total Interest</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatPrice(totalInterest)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Loan Amount:</span>
                    <span className="font-medium">{formatPrice(parseFloat(loanAmount) - parseFloat(downPayment))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Down Payment:</span>
                    <span className="font-medium">{formatPrice(parseFloat(downPayment))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Payments:</span>
                    <span className="font-medium">{formatPrice(monthlyPayment * parseFloat(loanTerm) * 12)}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Get Pre-Approved
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};