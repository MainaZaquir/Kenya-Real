import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProperties } from '../components/home/FeaturedProperties';
import { MarketInsights } from '../components/home/MarketInsights';
import { TrustSection } from '../components/home/TrustSection';
import { MortgageCalculator } from '../components/tools/MortgageCalculator';

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProperties />
      <MarketInsights />
      <MortgageCalculator />
      <TrustSection />
    </main>
  );
};