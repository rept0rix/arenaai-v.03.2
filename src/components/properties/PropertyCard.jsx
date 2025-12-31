import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Ruler, Building, MapPin, Eye, ExternalLink, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PropertyCard({ 
  property, 
  isSelected, 
  onSelect, 
  isCompareMode, 
  onQuickView,
  matchScore // New prop for match percentage
}) {
  const navigate = useNavigate();

  // Calculate match score if not provided
  const calculatedMatchScore = matchScore || (() => {
    let score = 70; // Base score
    
    // Add points based on property characteristics
    if (property.price && property.price < 4000000) score += 10;
    if (property.rooms && property.rooms >= 3) score += 8;
    // Assuming property.parking, property.elevator, property.balcony are boolean
    if (property.parking) score += 7; 
    if (property.elevator) score += 5;
    if (property.balcony) score += 6;
    if (property.location?.includes('תל אביב')) score += 12;
    
    return Math.min(score, 98); // Cap at 98%
  })();

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (isCompareMode) {
      onSelect(property.id);
    } else {
      onQuickView(property);
    }
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(createPageUrl(`PropertyDetails?id=${property.id}`), { 
      state: { property } 
    });
  };

  const handleProjectClick = (e) => {
    e.stopPropagation();
    if (property.projectId) {
      navigate(createPageUrl(`ProjectDetails?id=${property.projectId}`));
    }
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    onQuickView(property);
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-sky-500 shadow-lg' : 'hover:shadow-lg'
      } ${isCompareMode ? 'hover:ring-2 hover:ring-sky-300' : ''}`}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.image_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Selection indicator for compare mode */}
        {isCompareMode && (
          <div className="absolute top-3 right-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isSelected ? 'bg-sky-500 text-white' : 'bg-white/80 text-slate-600'
            }`}>
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
        )}
        
        {/* Price badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-slate-900 hover:bg-white">
            ₪{property.price?.toLocaleString()}
          </Badge>
        </div>

        {/* Quick view button - only show when not in compare mode */}
        {!isCompareMode && (
          <div className="absolute bottom-3 right-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white shadow-md"
              onClick={handleQuickViewClick}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 leading-tight">
          {property.title}
        </CardTitle>
        <div className="flex items-center text-slate-600 text-sm">
          <MapPin className="w-4 h-4 ml-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        {/* Match Score Bar */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">התאמה אישית</span>
            <span className="text-sm font-bold text-sky-600">{calculatedMatchScore}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-sky-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${calculatedMatchScore}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{property.rooms} חדרים</span>
          </div>
          {property.size && (
            <div className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              <span>{property.size} מ"ר</span>
            </div>
          )}
          {property.floor !== undefined && (
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span>קומה {property.floor}</span>
            </div>
          )}
        </div>

        {/* Unit Type and Facing */}
        {(property.unit_type || property.facing) && (
          <div className="flex gap-2 mb-3">
            {property.unit_type && (
              <Badge variant="outline" className="text-xs">טיפוס {property.unit_type}</Badge>
            )}
            {property.facing && (
              <Badge variant="outline" className="text-xs">{property.facing}</Badge>
            )}
          </div>
        )}

        {/* Project Badge */}
        {property.other_properties_in_project_count > 0 && property.project_name && (
          <div 
            onClick={handleProjectClick}
            className="mb-3 p-2 bg-sky-50 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-medium text-sky-700">{property.project_name}</span>
              </div>
              <Badge className="bg-sky-600 text-white text-xs">
                +{property.other_properties_in_project_count} דירות
              </Badge>
            </div>
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-sky-50 group-hover:border-sky-300"
          onClick={handleDetailsClick}
        >
          <ExternalLink className="w-4 h-4 ml-2" />
          פרטים נוספים
        </Button>
      </CardContent>
    </Card>
  );
}