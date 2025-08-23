import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (filters: any) => void;
  showFilters?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, showFilters = true }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSearch = () => {
    const filters = {
      query: searchQuery,
      location,
      priceRange,
      propertyType
    };
    
    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to properties page with filters
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (location) params.set('location', location);
      if (priceRange) params.set('price', priceRange);
      if (propertyType) params.set('type', propertyType);
      
      const queryString = params.toString();
      navigate(queryString ? `/properties?${queryString}` : '/properties');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
          >
            <option value="">Select Location</option>
            <option value="nairobi">Nairobi</option>
            <option value="kilimani">Kilimani</option>
            <option value="karen">Karen</option>
            <option value="westlands">Westlands</option>
            <option value="upper-hill">Upper Hill</option>
            <option value="kiambu">Kiambu</option>
            <option value="machakos">Machakos</option>
            <option value="mombasa">Mombasa</option>
            <option value="kisumu">Kisumu</option>
            <option value="nakuru">Nakuru</option>
            <option value="eldoret">Eldoret</option>
          </select>
        </div>
      </div>
      
      {showFilters && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
            >
              <option value="">Price Range</option>
              <option value="0-1000000">Under 1M KES</option>
              <option value="1000000-3000000">1M - 3M KES</option>
              <option value="3000000-5000000">3M - 5M KES</option>
              <option value="5000000-10000000">5M - 10M KES</option>
              <option value="10000000+">10M+ KES</option>
            </select>
          </div>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>
      )}
      
      <Button className="w-full py-3 text-lg" onClick={handleSearch}>
        <Search className="w-5 h-5 mr-2" />
        Search Properties
      </Button>
    </div>
  );
};