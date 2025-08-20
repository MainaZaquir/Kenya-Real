import React from 'react';
import { MapPin, Navigation, Zap, GraduationCap, ShoppingBag, Heart } from 'lucide-react';

interface PropertyMapProps {
  properties?: any[];
  center?: [number, number];
  zoom?: number;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties = [], 
  center = [36.8219, -1.2921], 
  zoom = 12 
}) => {
  // Mock nearby amenities
  const nearbyAmenities = [
    { type: 'school', name: 'Nairobi School', distance: '0.5km', icon: GraduationCap },
    { type: 'hospital', name: 'Nairobi Hospital', distance: '1.2km', icon: Heart },
    { type: 'mall', name: 'Westgate Mall', distance: '2.1km', icon: ShoppingBag },
    { type: 'transport', name: 'Westlands Stage', distance: '0.8km', icon: Navigation }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Location & Nearby</h3>
        <p className="text-gray-600">Interactive map with neighborhood insights</p>
      </div>
      
      {/* Map Placeholder */}
      <div className="relative h-96 bg-gradient-to-br from-blue-100 to-emerald-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h4>
            <p className="text-gray-600 mb-4">Mapbox integration coming soon</p>
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm">
              <div className="text-sm text-gray-600 mb-2">Current Location:</div>
              <div className="font-medium text-gray-900">Westlands, Nairobi</div>
              <div className="text-sm text-gray-500">Coordinates: {center[0]}, {center[1]}</div>
            </div>
          </div>
        </div>
        
        {/* Mock Property Pins */}
        <div className="absolute top-20 left-32 w-6 h-6 bg-orange-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-40 right-40 w-6 h-6 bg-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-20 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Nearby Amenities */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Nearby Amenities</h4>
        <div className="grid grid-cols-2 gap-4">
          {nearbyAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <amenity.icon className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{amenity.name}</div>
                <div className="text-xs text-gray-500">{amenity.distance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};