import React from 'react';

export default function ImageGallery({ property }) {
  const images = [
    property.image_url,
    ...(property.gallery_images || []),
  ].filter(Boolean);
  
  // Fill with placeholders if not enough images
  while (images.length < 5) {
    images.push(`https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80&seed=${images.length}`);
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[450px]">
      <div className="col-span-2 row-span-2">
        <img src={images[0]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
      </div>
      <div className="col-start-3 row-span-1">
         <img src={images[1]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
      </div>
      <div className="col-start-3 row-start-2">
         <img src={images[2]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
      </div>
    </div>
  );
}