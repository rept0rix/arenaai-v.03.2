
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, X, SlidersHorizontal, Building, MapPin, Home, DollarSign, Calendar } from 'lucide-react';
import { Property } from '@/entities/Property';
import { Developer } from '@/entities/Developer';
import { Project } from '@/entities/Project';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyFilters({ onFiltersChange, onViewAll, activeFilters = {}, isOpen, onToggle }) {
  const [openSections, setOpenSections] = useState({
    price: true,
    rooms: false,
    location: false,
    developers: false,
    features: false
  });
  
  const [filters, setFilters] = useState({
    priceMin: activeFilters.priceMin || '',
    priceMax: activeFilters.priceMax || '',
    rooms: activeFilters.rooms || [],
    regions: activeFilters.regions || [],
    cities: activeFilters.cities || [],
    developers: activeFilters.developers || [],
    projects: activeFilters.projects || [],
    features: activeFilters.features || []
  });

  const [developers, setDevelopers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadFilterData();
  }, []);

  // Update filters state when activeFilters prop changes
  useEffect(() => {
    setFilters({
      priceMin: activeFilters.priceMin || '',
      priceMax: activeFilters.priceMax || '',
      rooms: activeFilters.rooms || [],
      regions: activeFilters.regions || [],
      cities: activeFilters.cities || [],
      developers: activeFilters.developers || [],
      projects: activeFilters.projects || [],
      features: activeFilters.features || []
    });
  }, [activeFilters]);

  const loadFilterData = async () => {
    try {
      const [devsData, projsData, propertiesData] = await Promise.all([
        Developer.list(),
        Project.list(),
        Property.list()
      ]);
      
      setDevelopers(devsData);
      setProjects(projsData);
      
      // Extract unique cities from properties
      const uniqueCities = [...new Set(propertiesData.map(p => p.city).filter(Boolean))];
      setCities(uniqueCities.sort());
    } catch (error) {
      console.error('Error loading filter data:', error);
    }
  };

  const regions = [
    'כל הארץ',
    'צפון', 
    'מרכז',
    'דרום',
    'שפלה',
    'גוש דן',
    'השרון'
  ];

  const roomOptions = ['1', '2', '3', '4', '5', '6+'];
  
  const featureOptions = [
    'מעלית',
    'חניה',
    'מרפסת',
    'מחסן',
    'נוף לים',
    'נגיש לנכים',
    'חדר כושר',
    'בריכה',
    'גינה',
    'מרכז קניות קרוב'
  ];

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (category, value, checked = null) => {
    let newFilters = { ...filters };

    if (category === 'priceMin' || category === 'priceMax') {
      newFilters[category] = value;
    } else if (Array.isArray(newFilters[category])) {
      if (checked) {
        newFilters[category] = [...newFilters[category], value];
      } else {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      }
    }

    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      priceMin: '',
      priceMax: '',
      rooms: [],
      regions: [],
      cities: [],
      developers: [],
      projects: [],
      features: []
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const handleViewAllClick = () => {
    clearFilters(); // Clear local and parent filters
    if (onViewAll) {
      onViewAll(); // Call parent onViewAll (e.g., to force show results)
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceMin || filters.priceMax) count++;
    count += filters.rooms.length;
    count += filters.regions.length;
    count += filters.cities.length;
    count += filters.developers.length;
    count += filters.projects.length;
    count += filters.features.length;
    return count;
  };

  const FilterSection = ({ title, icon, sectionKey, children }) => (
    <Collapsible 
      open={openSections[sectionKey]} 
      onOpenChange={() => toggleSection(sectionKey)}
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-4 h-auto">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium">{title}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${openSections[sectionKey] ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );

  // Return just the filter button for header usage
  if (!isOpen) {
    return (
      <Button 
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <SlidersHorizontal className="w-4 h-4" />
        סינון
        {getActiveFiltersCount() > 0 && (
          <Badge className="bg-sky-500 text-white rounded-full px-1.5 py-0.5 text-xs min-w-[20px] h-5">
            {getActiveFiltersCount()}
          </Badge>
        )}
      </Button>
    );
  }

  // Return the filter panel when open
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -320, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-80 h-full bg-white border-l border-slate-200 shadow-lg flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h3 className="text-lg font-semibold">סינון תוצאות</h3>
            <div className="flex items-center gap-2">
              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  נקה הכל
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onToggle}>
                <X className="w-4 h-4" />
              </Button>
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-0">
            {/* Price Range */}
            <FilterSection title="מחיר" icon={<DollarSign className="w-4 h-4" />} sectionKey="price">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="מחיר מינימלי"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  />
                  <Input
                    placeholder="מחיר מקסימלי"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  />
                </div>
              </div>
            </FilterSection>

            {/* Rooms */}
            <FilterSection title="חדרים" icon={<Home className="w-4 h-4" />} sectionKey="rooms">
              <div className="grid grid-cols-3 gap-2">
                {roomOptions.map(room => (
                  <label key={room} className="flex items-center space-x-2 cursor-pointer p-2 rounded border hover:bg-slate-50">
                    <Checkbox
                      checked={filters.rooms.includes(room)}
                      onCheckedChange={(checked) => handleFilterChange('rooms', room, checked)}
                    />
                    <span className="text-sm">{room}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Location */}
            <FilterSection title="אזור" icon={<MapPin className="w-4 h-4" />} sectionKey="location">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">אזורים</h4>
                  <div className="space-y-1">
                    {regions.map(region => (
                      <label key={region} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.regions.includes(region)}
                          onCheckedChange={(checked) => handleFilterChange('regions', region, checked)}
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">ערים</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {cities.map(city => (
                      <label key={city} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.cities.includes(city)}
                          onCheckedChange={(checked) => handleFilterChange('cities', city, checked)}
                        />
                        <span className="text-sm">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Developers & Projects */}
            <FilterSection title="יזם / פרויקט" icon={<Building className="w-4 h-4" />} sectionKey="developers">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">יזמים</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {developers.map(dev => (
                      <label key={dev.id} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.developers.includes(dev.id)}
                          onCheckedChange={(checked) => handleFilterChange('developers', dev.id, checked)}
                        />
                        <span className="text-sm">{dev.name_he}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">פרויקטים</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {projects.map(project => (
                      <label key={project.id} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={filters.projects.includes(project.id)}
                          onCheckedChange={(checked) => handleFilterChange('projects', project.id, checked)}
                        />
                        <span className="text-sm">{project.name_he}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </FilterSection>

            {/* Features */}
            <FilterSection title="מאפיינים" icon={<Calendar className="w-4 h-4" />} sectionKey="features">
              <div className="space-y-1">
                {featureOptions.map(feature => (
                  <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={filters.features.includes(feature)}
                      onCheckedChange={(checked) => handleFilterChange('features', feature, checked)}
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex-shrink-0">
            <Button className="w-full bg-sky-500 hover:bg-sky-600" onClick={handleViewAllClick}>
                צפיה בכל הנכסים
            </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
