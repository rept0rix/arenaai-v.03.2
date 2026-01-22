import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, Eye, Filter, X, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProjectFloorplan({ projectId, properties, userFilters }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [show3DModal, setShow3DModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();
  const tableRef = React.useRef(null);

  // Asset type information (static)
  const assetTypeInfo = {
    'A': {
      name: 'טיפוס A',
      description: 'דירת 4 חדרים מרווחת עם נוף פנורמי מדהים לים, מרפסת שמש גדולה ועיצוב מודרני.',
      specs: {
        rooms: '4 חדרים',
        size: '110 מ״ר',
        balcony: '15 מ״ר מרפסת שמש',
        facing: 'מערב - נוף לים',
        storage: 'מחסן 6 מ״ר',
        parking: 'חניה אחת'
      },
      images: [
        'https://images.unsplash.com/photo-1502672260066-6bc4598a1a21?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ]
    },
    'B': {
      name: 'טיפוס B',
      description: 'דירת 5 חדרים יוקרתית עם חדר שירות, מרפסת עורפית ומטבח איטלקי מעוצב.',
      specs: {
        rooms: '5 חדרים + חדר שירות',
        size: '135 מ״ר',
        balcony: '12 מ״ר מרפסת + 8 מ״ר עורפית',
        facing: 'צפון-מזרח',
        storage: 'מחסן 8 מ״ר',
        parking: 'חניה כפולה'
      },
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
      ]
    },
    'C': {
      name: 'טיפוס C',
      description: 'דירת 3 חדרים אידיאלית לזוגות צעירים, מרפסת סוכה וחדר עבודה נפרד.',
      specs: {
        rooms: '3 חדרים + חדר עבודה',
        size: '95 מ״ר',
        balcony: '10 מ״ר מרפסת סוכה',
        facing: 'דרום',
        storage: 'מחסן 5 מ״ר',
        parking: 'חניה אחת'
      },
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800'
      ]
    },
    'D': {
      name: 'טיפוס D',
      description: 'דירת 5 חדרים פינתית עם חלונות מקיר לקיר, נוף אורבני ומרפסת שירות.',
      specs: {
        rooms: '5 חדרים',
        size: '140 מ״ר',
        balcony: '14 מ״ר + מרפסת שירות',
        facing: 'מערב-דרום פינתית',
        storage: 'מחסן 7 מ״ר',
        parking: 'חניה כפולה'
      },
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
      ]
    },
    'P': {
      name: 'פנטהאוז',
      description: 'פנטהאוז יוקרתי על הגג עם גג פרטי ענק, בריכת שחייה פרטית ונוף 360 מעלות.',
      specs: {
        rooms: '6 חדרים + יחידת הורים',
        size: '180 מ״ר + 120 מ״ר גג',
        balcony: 'גג פרטי 120 מ״ר',
        facing: 'נוף 360 מעלות',
        storage: 'מחסן 10 מ״ר',
        parking: 'שתי חניות + מחסן'
      },
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'
      ]
    }
  };

  // DEMO: If no user filters provided, use demo filters
  const demoFilters = {
    budget: { filter_field: 'budget', answer: 3500000 },
    rooms: { filter_field: 'rooms', answer: 4 },
    location: { filter_field: 'location', answer: 'תל אביב' }
  };
  
  const effectiveFilters = (userFilters && Object.keys(userFilters).length > 0) ? userFilters : demoFilters;

  // Calculate match score for each property based on user filters
  const calculateMatchScore = (property) => {
    // Special demo case: Floor 3, Type A, 5 rooms = 98%
    if (property.floor === 3 && property.unit_type === 'A' && property.rooms === 5) {
      return 98;
    }
    
    // All other units get random scores between 20-93%
    if (!property._cachedScore) {
      property._cachedScore = Math.floor(Math.random() * (93 - 20 + 1)) + 20;
    }
    return property._cachedScore;
  };

  if (!properties || properties.length === 0) {
    return <div className="text-center p-8">לא נמצאו דירות בפרויקט זה</div>;
  }

  // Create a visual representation of 60 floors
  const totalFloors = 60;
  const types = ['A', 'B', 'C', 'D', 'P'];
  const statuses = ['available', 'reserved', 'sold'];
  
  // Group real properties by floor and type - ONE property per floor/type combo
  const realPropertyMap = {};
  properties.forEach(prop => {
    const floor = prop.floor || 0;
    if (!realPropertyMap[floor]) realPropertyMap[floor] = {};
    const type = prop.unit_type || 'A';
    // Only take the first property for each floor/type combination
    if (!realPropertyMap[floor][type]) {
      realPropertyMap[floor][type] = prop;
    }
  });

  // Generate visual data for 60 floors with varying match scores
  const generateMockUnit = (floor, type) => {
    const basePrice = 2200000 + (floor * 45000); // Price increases with floor
    // More variety in room numbers for better matching
    const roomOptions = [3, 3, 4, 4, 4, 5, 5];
    const rooms = roomOptions[Math.floor(Math.random() * roomOptions.length)];
    // More available units for demo
    const statusWeights = ['available', 'available', 'available', 'reserved', 'sold'];
    const randomStatus = statusWeights[Math.floor(Math.random() * statusWeights.length)];
    
    return {
      id: `mock_${floor}_${type}`,
      floor,
      unit_type: type,
      rooms,
      price: basePrice + (Math.random() * 600000),
      status: randomStatus,
      size: 90 + Math.floor(Math.random() * 50),
      facing: ['צפון', 'דרום', 'מזרח', 'מערב'][Math.floor(Math.random() * 4)],
      balcony_size: 10 + Math.floor(Math.random() * 15),
      location: 'תל אביב',
      city: 'תל אביב',
      property_type: 'apartment',
      isMock: true
    };
  };

  const floors = Array.from({ length: totalFloors }, (_, i) => totalFloors - i); // 60 down to 1

  // Apply filters
  const filteredProperties = properties.filter(prop => {
    const statusMatch = filterStatus === 'all' || prop.status === filterStatus;
    const typeMatch = filterType === 'all' || prop.unit_type === filterType;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status, isAvailable = true) => {
    if (!isAvailable) {
      return 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-inner';
    }
    switch (status) {
      case 'available': return 'bg-sky-100 hover:bg-sky-200 text-sky-700 border-l-4 border-sky-500';
      case 'reserved': return 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-inner';
      case 'sold': return 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-inner';
      default: return 'bg-slate-200 text-slate-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'פנוי';
      case 'reserved': return 'שמור';
      case 'sold': return 'נמכר';
      default: return 'לא ידוע';
    }
  };

  const handleUnitClick = (property) => {
    if (isCompareMode) {
      toggleCompareSelection(property.id);
    } else {
      setSelectedUnit(property);
    }
  };

  const toggleCompareSelection = (propertyId) => {
    setSelectedForCompare(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= 5) {
        alert('ניתן לבחור עד 5 דירות להשוואה');
        return prev;
      }
      return [...prev, propertyId];
    });
  };

  const handleCompare = () => {
    if (selectedForCompare.length < 2) {
      alert('יש לבחור לפחות 2 דירות להשוואה');
      return;
    }
    navigate(createPageUrl(`ProjectComparison?projectId=${projectId}&ids=${selectedForCompare.join(',')}`));
  };

  const handleViewDetails = (property) => {
    if (property.isMock) {
      alert('זוהי דירה להמחשה בלבד');
      return;
    }
    navigate(createPageUrl(`PropertyDetails?id=${property.id}`), {
      state: { property }
    });
  };

  const projectName = properties[0]?.project_name || 'פרויקט';
  const developer = properties[0]?.developer || '';

  // Find best match
  const bestMatch = React.useMemo(() => {
    let best = null;
    let bestScore = 0;
    
    floors.forEach(floor => {
      types.forEach(type => {
        const realUnit = realPropertyMap[floor]?.[type];
        const unitToShow = realUnit || generateMockUnit(floor, type);
        const score = calculateMatchScore(unitToShow);
        
        if (score > bestScore && unitToShow.status === 'available') {
          bestScore = score;
          best = { ...unitToShow, floor, type };
        }
      });
    });
    
    return best;
  }, [floors, types, realPropertyMap]);

  const scrollToBestMatch = () => {
    if (!bestMatch || !tableRef.current) return;
    
    const floor = bestMatch.floor;
    const type = bestMatch.type;
    const cellId = `unit-${floor}-${type}`;
    const cell = document.getElementById(cellId);
    
    if (cell) {
      cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight effect
      cell.classList.add('ring-4', 'ring-amber-400', 'ring-offset-2');
      setTimeout(() => {
        cell.classList.remove('ring-4', 'ring-amber-400', 'ring-offset-2');
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-sky-600" />
              <div>
                <CardTitle className="text-2xl">{projectName}</CardTitle>
                {developer && <p className="text-sm text-slate-600">{developer}</p>}
              </div>
            </div>
            <div className="text-left grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-600">גובה הבניין</div>
                <div className="text-2xl font-bold text-slate-900">{totalFloors} קומות</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">שנת בנייה</div>
                <div className="text-2xl font-bold text-slate-900">2024</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Building Specs with Type Legend */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">מידע נוסף על הפרויקט</CardTitle>
            <div className="text-xs text-slate-600 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>לחץ על טיפוס לפרטים</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">שם הפרויקט</div>
              <div className="text-xs font-bold text-slate-900 truncate">{projectName}</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">יזם</div>
              <div className="text-xs font-bold text-slate-900 truncate">{developer || 'קבוצת רכישה'}</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">קבלן מבצע</div>
              <div className="text-xs font-bold text-slate-900 truncate">קבלן איכות בע״מ</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">אדריכל</div>
              <div className="text-xs font-bold text-slate-900 truncate">משרד אדריכלים מוביל</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">כתובת</div>
              <div className="text-xs font-bold text-slate-900 truncate">{properties[0]?.address || 'תל אביב'}</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">גובה</div>
              <div className="text-xs font-bold text-slate-900 truncate">60 קומות</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">התחלת שיווק</div>
              <div className="text-xs font-bold text-slate-900 truncate">ינואר 2024</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">התחלת בנייה</div>
              <div className="text-xs font-bold text-slate-900 truncate">מרץ 2024</div>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <div className="text-[10px] text-slate-600 truncate">מועד איכלוס</div>
              <div className="text-xs font-bold text-slate-900 truncate">דצמבר 2026*</div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[10px] text-amber-800">
            * מועדים משוערים. מועד האיכלוס בפועל כפוף לקבלת אישורים ותנאי השטח.
          </div>

          {/* Building Amenities */}
          <div className="border-t pt-3">
            <div className="text-[11px] font-semibold text-slate-700 mb-2">מתקנים ושירותים</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-700">חדר כושר מאובזר</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-700">מעלית שבת</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-700">שומר 24/7</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-slate-700">בריכת שחייה</span>
              </div>
            </div>
          </div>

          {/* Type Legend */}
          <div className="border-t pt-3">
            <div className="text-[11px] font-semibold text-slate-700 mb-2">טיפוסי דירות בפרויקט</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType(type);
                  }}
                  className="p-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-700">טיפוס {type}</span>
                    <Eye className="w-3 h-3 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compare Mode Bar */}
      {isCompareMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sky-50 border-2 border-sky-500 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-sky-900">
                נבחרו {selectedForCompare.length} דירות להשוואה
              </div>
              {selectedForCompare.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForCompare([])}
                >
                  נקה בחירה
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCompare}
                disabled={selectedForCompare.length < 2}
                className="bg-sky-500 hover:bg-sky-600"
              >
                השווה דירות ({selectedForCompare.length})
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCompareMode(false);
                  setSelectedForCompare([]);
                }}
              >
                ביטול
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters - Compact Design */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-slate-600" />
              <div className="flex gap-1.5">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={`h-8 text-xs ${filterStatus === 'all' ? 'bg-sky-500' : ''}`}
                >
                  הכל
                </Button>
                <Button
                  variant={filterStatus === 'available' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('available')}
                  className={`h-8 text-xs ${filterStatus === 'available' ? 'bg-sky-500' : ''}`}
                >
                  פנוי
                </Button>
              </div>
              
              <div className="h-6 w-px bg-slate-300"></div>
              
              <div className="flex gap-1.5">
                {types.map(type => (
                  <Button
                    key={type}
                    variant={filterType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType(type)}
                    className={`h-8 text-xs px-2 ${filterType === type ? 'bg-sky-500' : ''}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              {(filterStatus !== 'all' || filterType !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterType('all');
                  }}
                  className="h-8 text-xs"
                >
                  <X className="w-3 h-3 ml-1" />
                  נקה
                </Button>
              )}
              <Button
                variant={isCompareMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsCompareMode(!isCompareMode)}
                className={`h-8 text-xs ${isCompareMode ? 'bg-sky-500' : ''}`}
              >
                {isCompareMode ? 'מצב השוואה פעיל' : 'השווה דירות'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Match Banner */}
      {bestMatch && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900">הדירה המותאמת ביותר עבורך</div>
                  <div className="text-sm text-slate-700">
                    {bestMatch.rooms} חדרים • קומה {bestMatch.floor} • טיפוס {bestMatch.type} • התאמה של {calculateMatchScore(bestMatch)}%
                  </div>
                </div>
              </div>
              <Button
                onClick={scrollToBestMatch}
                className="bg-amber-500 hover:bg-amber-600 gap-2"
              >
                <span>קפוץ לדירה</span>
                <span>↓</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floorplan Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>מפת דירות</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                {totalFloors} קומות • 2 דירות בפרויקט {projectId}
              </p>
              {effectiveFilters === demoFilters && (
                <div className="mt-2 inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  <span>🎯</span>
                  <span>מצב דמו: ציונים מבוססים על העדפות לדוגמה</span>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShow3DModal(true)}
            >
              <Box className="w-4 h-4" />
              הדמיה של הבניין
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div ref={tableRef} className="max-h-[600px] overflow-y-auto border border-slate-200 rounded-lg">
              <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-3 text-center font-bold">קומה</th>
                  {types.map(type => (
                    <th 
                      key={type} 
                      className="border border-slate-300 p-3 text-center font-bold cursor-pointer hover:bg-sky-50 transition-colors group"
                      onClick={() => setSelectedType(type)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>טיפוס {type}</span>
                        <Eye className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {floors.map(floor => (
                  <tr key={floor} className="hover:bg-slate-50">
                    <td className="border border-slate-300 p-3 text-center font-semibold bg-slate-50">
                      {floor}
                    </td>
                    {types.map(type => {
                      // Get ONE real property for this floor/type, or generate mock
                      const realUnit = realPropertyMap[floor]?.[type];
                      const unitToShow = realUnit || generateMockUnit(floor, type);
                      
                      const statusMatch = filterStatus === 'all' || unitToShow.status === filterStatus;
                      const typeMatch = filterType === 'all' || unitToShow.unit_type === filterType;
                      const isFiltered = !statusMatch || !typeMatch;
                      const matchScore = calculateMatchScore(unitToShow);
                      const isAvailable = unitToShow.status === 'available';
                      // Mark floor 3, type A, 5 rooms as recommended
                      const isRecommended = (floor === 3 && type === 'A' && unitToShow.rooms === 5) || realUnit?.isRecommended;

                      return (
                        <td key={`${floor}-${type}`} className="border border-slate-300 p-1.5">
                          <div id={`unit-${floor}-${type}`} className="relative group">
                            <button
                              onClick={() => !unitToShow.isMock && isAvailable && handleUnitClick(unitToShow)}
                              disabled={!isAvailable || unitToShow.isMock}
                              className={`${
                                isCompareMode && selectedForCompare.includes(unitToShow.id)
                                  ? 'ring-2 ring-sky-500 ring-offset-1'
                                  : ''
                              } ${
                                isRecommended && isAvailable 
                                  ? 'bg-sky-500 hover:bg-sky-600 text-white border-l-4 border-sky-700'
                                  : getStatusColor(unitToShow.status, isAvailable)
                              } px-2 py-2 rounded text-xs font-medium transition-all ${
                                unitToShow.isMock || !isAvailable ? 'cursor-not-allowed' : 'transform hover:scale-105 cursor-pointer'
                              } relative w-full ${
                                isFiltered ? 'opacity-30' : ''
                              } flex flex-col items-center justify-center min-h-[60px]`}
                            >
                              <div className="w-full">
                                <div className="flex items-center justify-between w-full mb-0.5">
                                  <div className="flex-1 text-center">
                                    <div className="text-[11px] font-semibold">{unitToShow.rooms}ח׳</div>
                                    <div className="text-[10px] font-normal">₪{(unitToShow.price / 1000000).toFixed(1)}M</div>
                                  </div>
                                  {isRecommended && isAvailable && (
                                    <div className="text-yellow-300 text-sm leading-none ml-1">
                                      ⭐
                                    </div>
                                  )}
                                </div>
                                {matchScore !== null && (
                                  <div className={`w-full text-center py-0.5 rounded text-[9px] font-bold ${
                                    isRecommended && isAvailable
                                      ? 'bg-sky-100 text-sky-800'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    אחוזי התאמה: {matchScore}%
                                  </div>
                                )}
                              </div>
                              {isCompareMode && selectedForCompare.includes(unitToShow.id) && !unitToShow.isMock && (
                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs shadow-md z-10">
                                  ✓
                                </div>
                              )}
                            </button>
                            
                            {/* Hover tooltip with match score */}
                            {isAvailable && !unitToShow.isMock && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                                <div className="font-semibold mb-1">{unitToShow.rooms} חדרים - ₪{unitToShow.price?.toLocaleString()}</div>
                                {matchScore && (
                                  <div className="text-sky-300">התאמה: {matchScore}%</div>
                                )}
                                <div className="text-slate-300 text-[10px] mt-1">לחץ לפרטים נוספים</div>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-4 items-center justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-sky-100 border-l-4 border-sky-500 rounded"></div>
              <span className="text-sm text-slate-600">פנוי</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-200 rounded shadow-inner"></div>
              <span className="text-sm text-slate-600">לא זמין</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 bg-sky-100 border-l-4 border-sky-500 rounded flex items-center justify-center">
                <span className="text-xs">⭐</span>
              </div>
              <span className="text-sm text-slate-600">דירה מומלצת</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Type Info Modal */}
      <Dialog open={!!selectedType} onOpenChange={(open) => {
        if (!open) setSelectedType(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {selectedType && assetTypeInfo[selectedType] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-sky-600" />
                  {assetTypeInfo[selectedType].name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Specs Table */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">מפרט טכני</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(assetTypeInfo[selectedType].specs).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <div className="text-xs text-slate-600 mb-1">
                          {key === 'rooms' ? 'חדרים' :
                           key === 'size' ? 'שטח' :
                           key === 'balcony' ? 'מרפסת' :
                           key === 'facing' ? 'כיוון' :
                           key === 'storage' ? 'מחסן' :
                           key === 'parking' ? 'חניה' : key}
                        </div>
                        <div className="font-semibold text-slate-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floor Plan and Technical Specs */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">תכנית דירה ומפרט מפורט</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Floor Plan */}
                    <div className="border-2 border-sky-200 rounded-lg overflow-hidden bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        תכנית דירה
                      </div>
                      <div className="aspect-square bg-white rounded border flex items-center justify-center">
                        <div className="text-center text-slate-400">
                          <Building2 className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">תכנית הדירה תוצג כאן</p>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="border-2 border-purple-200 rounded-lg overflow-hidden bg-purple-50 p-4">
                      <div className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <Box className="w-4 h-4" />
                        מפרט טכני מפורט
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">רצפה:</span> קרמיקה פורצלן 60x60
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">קירות:</span> צביעה אקרילית מעולה
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">דלתות:</span> דלתות פנים ביטחון
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">חלונות:</span> אלומיניום כפול זיגוג
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">מיזוג:</span> מזגן מולטי מרכזי
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">מטבח:</span> ארונות איכותיים + גרניט
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">חשמל:</span> לוח חשמל חכם
                        </div>
                        <div className="bg-white p-2 rounded">
                          <span className="font-semibold">אינטרקום:</span> וידאו אינטרקום
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 3D Visualization Modal */}
      <Dialog open={show3DModal} onOpenChange={setShow3DModal}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>הדמיית תלת מימד - {projectName}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-slate-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <Box className="w-16 h-16 text-slate-400 mx-auto" />
              <p className="text-slate-600">הדמיה תלת מימדית של הבניין תיטען כאן</p>
              <p className="text-sm text-slate-500">תוכל לסובב ולהתקרב למודל הבניין</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Selected Unit Details - Enhanced Popup */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedUnit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
            <Card className="border-2 border-sky-400 shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <CardHeader className="bg-gradient-to-r from-sky-500 to-purple-500 text-white pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">דירת {selectedUnit.rooms} חדרים</CardTitle>
                      <div className="text-sky-100 text-sm">קומה {selectedUnit.floor} • טיפוס {selectedUnit.unit_type}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedUnit(null)} className="text-white hover:bg-white/20">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Match Score - Always visible */}
                <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">אחוז התאמה</span>
                    <span className="text-2xl font-bold text-white">
                      {calculateMatchScore(selectedUnit) || 0}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                {/* Price and Status */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm text-slate-600 mb-1">מחיר</div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₪{selectedUnit.price?.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      ₪{Math.round(selectedUnit.price / selectedUnit.size).toLocaleString()}/מ״ר
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center">
                    <div className="text-sm text-slate-600 mb-2">סטטוס</div>
                    <Badge className={`${getStatusColor(selectedUnit.status, selectedUnit.status === 'available')} text-sm px-3 py-1 w-fit`}>
                      {getStatusText(selectedUnit.status)}
                    </Badge>
                  </div>
                </div>

                {/* Property Details Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-sky-50 rounded-lg">
                    <div className="text-2xl font-bold text-sky-700">{selectedUnit.rooms}</div>
                    <div className="text-xs text-slate-600">חדרים</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">{selectedUnit.size}</div>
                    <div className="text-xs text-slate-600">מ״ר</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-slate-700">{selectedUnit.floor}</div>
                    <div className="text-xs text-slate-600">קומה</div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-3 mb-6">
                  {selectedUnit.facing && (
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">כיוון אוויר</span>
                      <span className="text-sm font-semibold text-slate-900">{selectedUnit.facing}</span>
                    </div>
                  )}
                  {selectedUnit.balcony_size && (
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">גודל מרפסת</span>
                      <span className="text-sm font-semibold text-slate-900">{selectedUnit.balcony_size} מ״ר</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">סה״כ שטח עם מרפסת</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {selectedUnit.size + (selectedUnit.balcony_size || 0)} מ״ר
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => alert('הדמיה תלת-ממדית של הדירה - בקרוב!')}
                    className="h-12 border-2 hover:bg-slate-50"
                  >
                    <Box className="w-5 h-5 ml-2" />
                    הדמיה תלת מימד
                  </Button>
                  <Button
                    onClick={() => handleViewDetails(selectedUnit)}
                    className="h-12 bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600"
                  >
                    <Eye className="w-5 h-5 ml-2" />
                    פרטים מלאים
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filtered Results Summary */}
      {(filterStatus !== 'all' || filterType !== 'all') && (
        <div className="text-center text-sm text-slate-600">
          מציג {filteredProperties.length} מתוך {properties.length} דירות
        </div>
      )}
    </div>
  );
}