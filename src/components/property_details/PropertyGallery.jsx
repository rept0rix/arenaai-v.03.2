import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { View, Video, Camera, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyGallery({ property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="shadow-sm overflow-hidden">
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <img 
            src={images[currentImageIndex]} 
            alt={`${property.title} - תמונה ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
            <Button size="sm" className="bg-black/50 text-white backdrop-blur-sm hover:bg-black/70">
              <View className="w-4 h-4 ml-2"/>
              הדמיית תלת מימד
            </Button>
            <Button size="sm" className="bg-black/50 text-white backdrop-blur-sm hover:bg-black/70">
              <Video className="w-4 h-4 ml-2"/>
              סיור וירטואלי
            </Button>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-10 w-10"
          onClick={prevImage}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full h-10 w-10"
          onClick={nextImage}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Badge className="absolute bottom-4 right-4 bg-black/70 text-white">
          {currentImageIndex + 1} / {images.length}
        </Badge>
      </div>

      <div className="p-4">
        <div className="flex gap-2 justify-center">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden ring-2 ring-offset-2 ring-transparent transition-all ${
                index === currentImageIndex ? 'ring-primary' : 'hover:ring-primary/50'
              }`}
            >
              <img src={image} alt={`תמונה ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}