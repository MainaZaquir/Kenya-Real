import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square, Star, Shield, Phone, MessageCircle } from 'lucide-react';
import { Property } from '../../types';
import { formatPrice, formatArea } from '../../utils/format';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();

  const handleWhatsAppContact = () => {
    const message = `Hi, I'm interested in the property: ${property.title}`;
    const whatsappUrl = `https://wa.me/${property.agent.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailContact = () => {
    const subject = `Inquiry about ${property.title}`;
    const body = `Hi ${property.agent.name},\n\nI'm interested in the property: ${property.title}\nLocation: ${property.location.area}, ${property.location.county}\nPrice: ${formatPrice(property.price, property.currency)}\n\nPlease provide more details.\n\nThank you!`;
    const emailUrl = `mailto:${property.agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  const handleViewDetails = () => {
    navigate(`/properties/${property.id}`);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleWhatsAppContact();
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleEmailContact();
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle save functionality
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleViewDetails}
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
        <button
          onClick={handleSaveClick}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
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
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
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
          <div className="flex items-center space-x-2">
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 text-sm">{property.agent.name}</span>
                {property.agent.verified && (
                  <Shield className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{property.agent.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleWhatsAppClick}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleEmailClick}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Email"
            >
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Contact
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
