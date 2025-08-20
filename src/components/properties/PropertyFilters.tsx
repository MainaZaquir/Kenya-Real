import React from 'react';
import { SearchFilters } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface PropertyFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: '',
      location: '',
      priceMin: 0,
      priceMax: 0,
      propertyType: '',
      bedrooms: 0,
      status: 'all',
      sortBy: 'newest'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">All Locations</option>
          <option value="nairobi">Nairobi</option>
          <option value="mombasa">Mombasa</option>
          <option value="kisumu">Kisumu</option>
          <option value="nakuru">Nakuru</option>
          <option value="eldoret">Eldoret</option>
        </select>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="all">All</option>
          <option value="for-sale">For Sale</option>
          <option value="for-rent">For Rent</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (KES)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin || ''}
            onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value) || 0)}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax || ''}
            onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Bedrooms
        </label>
        <select
          value={filters.bedrooms}
          onChange={(e) => handleFilterChange('bedrooms', parseInt(e.target.value))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value={0}>Any</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5+</option>
        </select>
      </div>

      {/* Quick Price Filters */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Price Filters
        </label>
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('priceMin', 0);
              handleFilterChange('priceMax', 1000000);
            }}
          >
            Under 1M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('priceMin', 1000000);
              handleFilterChange('priceMax', 3000000);
            }}
          >
            1M - 3M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('priceMin', 3000000);
              handleFilterChange('priceMax', 5000000);
            }}
          >
            3M - 5M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('priceMin', 5000000);
              handleFilterChange('priceMax', 0);
            }}
          >
            5M+
          </Button>
        </div>
      </div>
    </div>
  );
};