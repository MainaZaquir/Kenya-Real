import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Star, Shield, MessageCircle, Phone } from 'lucide-react';
import { mockProperties } from '../../data/mockData';
import { formatPrice, formatArea } from '../../utils/format';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const FeaturedProperties: React.FC = () => {
  const navigate = useNavigate();
  const featuredProperties = mockProperties.filter(property => property.featured);

  const handleWhatsAppContact = (property: any) => {
    const message = `Hi, I'm interested in the property: ${property.title}`;
    const whatsappUrl = `https://wa.me/${property.agent.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewDetails = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked premium properties from verified agents across Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={property.status === 'for-sale' ? 'success' : 'primary'}
                    className="text-white bg-orange-600"
                  >
                    {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                  </Badge>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <div className="text-xl font-bold text-white drop-shadow-lg">
                    {formatPrice(property.price, property.currency)}
                    {property.status === 'for-rent' && <span className="text-sm font-normal">/month</span>}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location.area}, {property.location.county}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {property.description}
                  </p>
                </div>

                {/* Property Details */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span>{formatArea(property.area)}</span>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <img
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900 text-sm">{property.agent.name}</span>
                        {property.agent.verified && (
                          <Shield className="w-3 h-3 text-emerald-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{property.agent.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhatsAppContact(property)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWhatsAppContact(property)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleViewDetails(property.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/properties')}
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};