import { Property, Agent, MarketInsight } from '../types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sarah Wanjiku',
    email: 'sarah@kenyarealestate.co.ke',
    phone: '+254722123456',
    whatsapp: '+254722123456',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    verified: true,
    rating: 4.8,
    reviewCount: 127,
    company: 'Nairobi Premier Properties',
    license: 'REA/2023/001234',
    specialties: ['Luxury Homes', 'Commercial Properties'],
    bio: 'Experienced real estate agent specializing in Nairobi premium properties with over 8 years in the industry.'
  },
  {
    id: '2',
    name: 'David Kimani',
    email: 'david@coastalproperties.co.ke',
    phone: '+254733987654',
    whatsapp: '+254733987654',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    verified: true,
    rating: 4.6,
    reviewCount: 89,
    company: 'Coastal Properties Ltd',
    license: 'REA/2023/005678',
    specialties: ['Residential Sales', 'Investment Properties'],
    bio: 'Dedicated to helping families find their dream homes across Nairobi and surrounding areas.'
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: '3-Bedroom Modern Apartment in Kilimani',
    description: 'Spacious modern apartment with stunning city views, located in the heart of Kilimani. Features include a modern kitchen, balcony, and secure parking.',
    price: 4500000,
    currency: 'KES',
    type: 'apartment',
    status: 'for-sale',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    location: {
      county: 'Nairobi',
      area: 'Kilimani',
      address: 'Argwings Kodhek Road, Kilimani',
      coordinates: [36.7827, -1.2944]
    },
    amenities: ['Parking', 'Security', 'Balcony', 'Modern Kitchen', 'City View'],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[0],
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: '4-Bedroom Villa in Karen',
    description: 'Luxurious 4-bedroom villa in the prestigious Karen neighborhood. Features beautiful gardens, swimming pool, and servant quarters.',
    price: 8500000,
    currency: 'KES',
    type: 'house',
    status: 'for-sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    location: {
      county: 'Nairobi',
      area: 'Karen',
      address: 'Karen Road, Karen',
      coordinates: [36.6850, -1.3194]
    },
    amenities: ['Swimming Pool', 'Garden', 'Servant Quarters', 'Parking', 'Security'],
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[1],
    featured: true,
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: '2-Bedroom Apartment for Rent in Westlands',
    description: 'Modern 2-bedroom apartment in Westlands with easy access to shopping malls and business district.',
    price: 65000,
    currency: 'KES',
    type: 'apartment',
    status: 'for-rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    location: {
      county: 'Nairobi',
      area: 'Westlands',
      address: 'Westlands Road, Westlands',
      coordinates: [36.8097, -1.2676]
    },
    amenities: ['Parking', 'Security', 'Gym', 'Swimming Pool'],
    images: [
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[0],
    featured: false,
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Commercial Space in Upper Hill',
    description: 'Prime commercial space in Upper Hill business district, perfect for offices or retail. High visibility location.',
    price: 180000,
    currency: 'KES',
    type: 'commercial',
    status: 'for-rent',
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    location: {
      county: 'Nairobi',
      area: 'Upper Hill',
      address: 'Mara Road, Upper Hill',
      coordinates: [36.8219, -1.2921]
    },
    amenities: ['Parking', 'Security', 'Elevator', 'AC'],
    images: [
      'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    agent: mockAgents[1],
    featured: false,
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  }
];

export const marketInsights: MarketInsight[] = [
  {
    area: 'Kilimani',
    averageRentPrice: 55000,
    averageSalePrice: 4200000,
    pricePerSqm: 35000,
    priceChange: 5.2,
    totalListings: 156,
    amenityScores: {
      schools: 8,
      transport: 9,
      shopping: 9,
      healthcare: 8,
      security: 7
    }
  },
  {
    area: 'Karen',
    averageRentPrice: 120000,
    averageSalePrice: 8900000,
    pricePerSqm: 36000,
    priceChange: 3.8,
    totalListings: 89,
    amenityScores: {
      schools: 9,
      transport: 6,
      shopping: 7,
      healthcare: 9,
      security: 9
    }
  },
  {
    area: 'Westlands',
    averageRentPrice: 68000,
    averageSalePrice: 5100000,
    pricePerSqm: 60000,
    priceChange: 7.1,
    totalListings: 203,
    amenityScores: {
      schools: 7,
      transport: 9,
      shopping: 10,
      healthcare: 8,
      security: 8
    }
  }
];