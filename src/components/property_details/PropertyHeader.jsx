
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Eye, Heart, Share2, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/entities/User';
import { toast } from "sonner";

export default function PropertyHeader({ property, viewCount }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user && user.favorite_properties && property) {
      setIsFavorite(user.favorite_properties.includes(property.id));
    }
  }, [user, property]);

  const checkUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("יש להתחבר כדי לשמור נכסים");
      return;
    }

    setIsLoading(true);
    try {
      const currentFavorites = user.favorite_properties || [];
      let newFavorites;

      if (isFavorite) {
        // הסרה מהמועדפים
        newFavorites = currentFavorites.filter(id => id !== property.id);
        toast.success("הנכס הוסר מהמועדפים");
      } else {
        // הוספה למועדפים
        newFavorites = [...currentFavorites, property.id];
        toast.success("הנכס נשמר למועדפים!");
      }

      await User.updateMyUserData({ favorite_properties: newFavorites });
      setUser(prevUser => ({ ...prevUser, favorite_properties: newFavorites }));
      setIsFavorite(!isFavorite);

    } catch (error) {
      toast.error("שגיאה בשמירת הנכס");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2">
            <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="text-sm text-slate-500 hover:text-slate-700"
            >
                <ArrowLeft className="w-4 h-4 ml-2" />
                חזרה
            </Button>
            <ChevronLeft className="w-4 h-4 text-slate-400"/>
            <span className="text-sm font-medium text-slate-700">{property.title}</span>
        </div>
      </div>
      
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">{property.title}</h1>
            <p className="text-slate-600 mt-2 mb-4">{property.location}</p>
            
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{viewCount} צפיות השבוע</span>
              </div>
              <Badge variant="outline">עודכן היום</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleToggleFavorite}
              disabled={isLoading}
              className={`transition-colors ${
                isFavorite 
                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                  : 'hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ml-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              {isLoading ? 'שומר...' : isFavorite ? 'נשמר' : 'שמור'}
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 ml-2" />
              שתף
            </Button>
            <Button>
              <Phone className="w-4 h-4 ml-2" />
              התקשר עכשיו
            </Button>
            <Button variant="secondary">
              <Calendar className="w-4 h-4 ml-2" />
              קבע פגישה
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
