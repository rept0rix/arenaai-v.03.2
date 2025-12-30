import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Heart, Share2, View, Video, Camera, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PropertyHero({ property }) {
  const navigate = useNavigate();

  const images = [
    property.image_url,
    ...(property.gallery_images || []),
  ].filter(Boolean);
  
  while (images.length < 6) {
    images.push(`https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80&seed=${images.length}`);
  }

  return (
    <div className="relative">
      {/* Breadcrumb */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="text-sm text-slate-500 flex items-center gap-2">
          <button onClick={() => navigate(createPageUrl('Home'))} className="hover:underline">דף הבית</button>
          <ChevronLeft className="w-4 h-4"/>
          <button onClick={() => navigate(createPageUrl('Chat'))} className="hover:underline">חיפוש</button>
          <ChevronLeft className="w-4 h-4"/>
          <span className="font-semibold text-slate-700">{property.title}</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="bg-white px-6 py-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{property.title}</h1>
              <Badge className="bg-sky-500 text-white text-lg px-3 py-1">
                ₪ {property.price?.toLocaleString()}
              </Badge>
            </div>
            <div className="flex items-center text-slate-600 mb-4">
              <MapPin className="w-5 h-5 ml-2" />
              <span className="text-lg">{property.location}</span>
            </div>
            
            {/* Property Features */}
            <div className="flex flex-wrap gap-6 text-slate-700 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{property.rooms}</span>
                <span>חדרים</span>
              </div>
              {property.size && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{property.size}</span>
                  <span>מ״ר</span>
                </div>
              )}
              {property.floor && (
                <div className="flex items-center gap-2">
                  <span>קומה</span>
                  <span className="font-semibold">{property.floor}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 ml-2" />
              שמור
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 ml-2" />
              שתף
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-900">
            <View className="w-4 h-4 ml-2"/>
            הדמיית תלת מימד
          </Button>
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-900">
            <Video className="w-4 h-4 ml-2"/>
            סיור וירטואלי
          </Button>
          <Button variant="outline">
            <Camera className="w-4 h-4 ml-2"/>
            גלריית תמונות
          </Button>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-3 h-[400px]">
          <div className="col-span-2 row-span-2">
            <img src={images[0]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
          </div>
          <div className="col-span-1">
            <img src={images[1]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
          </div>
          <div className="col-span-1">
            <img src={images[2]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
          </div>
          <div className="col-span-1">
            <img src={images[3]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
          </div>
          <div className="col-span-1">
            <img src={images[4]} alt={property.title} className="w-full h-full object-cover rounded-lg"/>
          </div>
        </div>
      </div>
    </div>
  );
}