import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Home, Info } from 'lucide-react';
import PropertyInfoModal from './PropertyInfoModal';

const PropertyPreviewCard = ({ property, onClick }) => {
  return (
    <div 
      className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={property.image_url || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
        alt={property.title}
        className="h-32 w-full object-cover"
      />
      <div className="p-3">
        <h4 className="font-bold text-sm truncate">{property.title}</h4>
        <p className="text-xs text-slate-500 truncate">{property.location}</p>
        <Badge className="mt-2 bg-sky-100 text-sky-800">
          {property.price?.toLocaleString()} ₪
        </Badge>
      </div>
    </div>
  );
};

export default function MobilePropertyPreview({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="h-full flex flex-col bg-slate-100 border-t border-slate-200">
      <div className="p-3">
        <h3 className="font-bold text-slate-800">
          <Home className="w-4 h-4 inline-block ml-2"/>
          נכסים ({properties.length})
        </h3>
      </div>
      {properties.length > 0 ? (
        <div className="flex-1 overflow-x-auto pb-3 px-3">
          <div className="flex gap-4">
            {properties.map(p => (
              <PropertyPreviewCard key={p.id} property={p} onClick={() => setSelectedProperty(p)} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
          אין נכסים מתאימים כרגע...
        </div>
      )}
       <AnimatePresence>
        {selectedProperty && (
          <PropertyInfoModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}