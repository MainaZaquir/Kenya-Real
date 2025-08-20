import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: 'Verified Agents Only',
      description: 'All agents are thoroughly vetted and licensed by the Estate Agents Registration Board (EARB)',
      color: 'text-emerald-600'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every property listing is verified for accuracy and authenticity before publication',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Join thousands of satisfied customers who found their perfect homes through our platform',
      color: 'text-orange-600'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you throughout your property journey',
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Why Kenyans Trust Us
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built specifically for the Kenyan market with trust, transparency, and local expertise at our core
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="text-center space-y-4 group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <point.icon className={`w-8 h-8 ${point.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{point.title}</h3>
              <p className="text-gray-300 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 rounded-2xl p-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-orange-400">98%</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">100%</div>
              <div className="text-gray-300">Agent Verification</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">24hrs</div>
              <div className="text-gray-300">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};