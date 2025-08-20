export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'KES' | 'USD';
  type: 'apartment' | 'house' | 'commercial' | 'land';
  status: 'for-sale' | 'for-rent';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  location: {
    county: string;
    area: string;
    address: string;
    coordinates: [number, number]; // [lng, lat]
  };
  amenities: string[];
  images: string[];
  agent: Agent;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  company: string;
  license: string;
  specialties: string[];
  bio: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'buyer' | 'agent' | 'admin';
  savedProperties: string[];
  preferences: {
    maxPrice: number;
    minBedrooms: number;
    preferredAreas: string[];
    propertyTypes: string[];
  };
}

export interface SearchFilters {
  query: string;
  location: string;
  priceMin: number;
  priceMax: number;
  propertyType: string;
  bedrooms: number;
  status: 'for-sale' | 'for-rent' | 'all';
  sortBy: 'newest' | 'price-low' | 'price-high' | 'relevance';
}

export interface MarketInsight {
  area: string;
  averageRentPrice: number;
  averageSalePrice: number;
  pricePerSqm: number;
  priceChange: number; // percentage
  totalListings: number;
  amenityScores: {
    schools: number;
    transport: number;
    shopping: number;
    healthcare: number;
    security: number;
  };
}