import React from 'react';
import PropertyCard from '../properties/PropertyCard';

export default function SimilarProperties({ properties }) {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">נכסים נוספים שעשויים לעניין אותך</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map(prop => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
    </div>
  );
}