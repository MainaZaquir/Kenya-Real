import React from "react";
import { Button } from "../ui/Button";

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Apartment",
    description: "2 bed, 2 bath in the city center",
    price: "$1,200 / month",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    title: "Cozy Studio",
    description: "Perfect for students and professionals",
    price: "$800 / month",
    image: "https://via.placeholder.com/400x250",
  },
];

export const FeaturedProperties: React.FC = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Featured Properties</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {mockProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">{property.description}</p>
              <p className="font-bold mt-2">{property.price}</p>
              <Button className="mt-4">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
