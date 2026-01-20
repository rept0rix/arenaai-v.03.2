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
  const navigate = useNavigate();

  // Calculate match score for each property based on user filters
  const calculateMatchScore = (property) => {
    if (!userFilters || Object.keys(userFilters).length === 0) return null;
    
    let score = 0;
    let totalCriteria = 0;

    Object.values(userFilters).forEach(filter => {
      if (!filter.filter_field || filter.answer === undefined) return;
      
      totalCriteria++;
      const { filter_field, answer } = filter;

      switch (filter_field) {
        case 'budget':
          if (property.price <= answer) score++;
          break;
        case 'location':
          if (property.city?.toLowerCase().includes(answer.toLowerCase()) || 
              property.location?.toLowerCase().includes(answer.toLowerCase())) {
            score++;
          }
          break;
        case 'rooms':
          if (property.rooms >= answer) score++;
          break;
        case 'property_type':
          if (Array.isArray(answer)) {
            if (answer.some(a => property.property_type?.toLowerCase().includes(a.toLowerCase()))) {
              score++;
            }
          } else if (property.property_type?.toLowerCase().includes(answer.toLowerCase())) {
            score++;
          }
          break;
      }
    });

    return totalCriteria > 0 ? Math.round((score / totalCriteria) * 100) : null;
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

  // Generate visual data for 60 floors
  const generateMockUnit = (floor, type) => {
    const basePrice = 2500000 + (floor * 50000); // Price increases with floor
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const rooms = [3, 4, 5][Math.floor(Math.random() * 3)];
    
    return {
      id: `mock_${floor}_${type}`,
      floor,
      unit_type: type,
      rooms,
      price: basePrice + (Math.random() * 500000),
      status: randomStatus,
      size: 90 + Math.floor(Math.random() * 50),
      facing: ['צפון', 'דרום', 'מזרח', 'מערב'][Math.floor(Math.random() * 4)],
      balcony_size: 10 + Math.floor(Math.random() * 15),
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
      
      {/* Building Specs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">מפרט הבניין</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">גובה הבניין</div>
              <div className="text-lg font-bold text-slate-900">60 קומות</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">שנת בנייה</div>
              <div className="text-lg font-bold text-slate-900">2024</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">קבלן</div>
              <div className="text-lg font-bold text-slate-900">קבלן איכות גבוהה</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">אדריכל</div>
              <div className="text-lg font-bold text-slate-900">משרד אדריכלים מוביל</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">תקן ירוק</div>
              <div className="text-lg font-bold text-slate-900">תו תקן ירוק 5 כוכבים</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">מעליות</div>
              <div className="text-lg font-bold text-slate-900">מעליות מהירות 4</div>
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

      {/* Floorplan Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>מפת דירות</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                {totalFloors} קומות • 2 דירות בפרויקט {projectId}
              </p>
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
            <div className="max-h-[600px] overflow-y-auto border border-slate-200 rounded-lg">
              <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-3 text-center font-bold">קומה</th>
                  {types.map(type => (
                    <th key={type} className="border border-slate-300 p-3 text-center font-bold">
                      טיפוס {type}
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
                      const isRecommended = realUnit?.isRecommended;

                      return (
                        <td key={`${floor}-${type}`} className="border border-slate-300 p-1.5">
                          <div className="relative group">
                            <button
                              onClick={() => !unitToShow.isMock && isAvailable && handleUnitClick(unitToShow)}
                              disabled={!isAvailable || unitToShow.isMock}
                              className={`${
                                isCompareMode && selectedForCompare.includes(unitToShow.id)
                                  ? 'ring-2 ring-sky-500 ring-offset-1'
                                  : ''
                              } ${getStatusColor(unitToShow.status, isAvailable)} px-2 py-1.5 rounded text-xs font-medium transition-all ${
                                unitToShow.isMock || !isAvailable ? 'cursor-not-allowed' : 'transform hover:scale-105 cursor-pointer'
                              } relative w-full ${
                                isFiltered ? 'opacity-30' : ''
                              }`}
                            >
                              {isRecommended && isAvailable && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs shadow-md z-10">
                                  ⭐
                                </div>
                              )}
                              {isCompareMode && selectedForCompare.includes(unitToShow.id) && !unitToShow.isMock && (
                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                                  ✓
                                </div>
                              )}
                              <div className="text-[11px]">{unitToShow.rooms}ח׳</div>
                              <div className="text-[10px] font-normal">₪{(unitToShow.price / 1000000).toFixed(1)}M</div>
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

      {/* Selected Unit Details - Popup */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedUnit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full"
            >
            <Card className="border-2 border-sky-500 shadow-2xl">
              <CardHeader className="bg-sky-50">
                <div className="flex items-center justify-between">
                  <CardTitle>פרטי דירה - קומה {selectedUnit.floor}, טיפוס {selectedUnit.unit_type}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedUnit(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-600">מחיר</div>
                    <div className="text-2xl font-bold text-slate-900">
                      ₪{selectedUnit.price?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">סטטוס</div>
                    <Badge className={getStatusColor(selectedUnit.status)}>
                      {getStatusText(selectedUnit.status)}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">חדרים</div>
                    <div className="text-lg font-semibold">{selectedUnit.rooms} חדרים</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">שטח</div>
                    <div className="text-lg font-semibold">{selectedUnit.size} מ״ר</div>
                  </div>
                  {selectedUnit.facing && (
                    <div>
                      <div className="text-sm text-slate-600">כיוון</div>
                      <div className="text-lg font-semibold">{selectedUnit.facing}</div>
                    </div>
                  )}
                  {selectedUnit.balcony_size && (
                    <div>
                      <div className="text-sm text-slate-600">מרפסת</div>
                      <div className="text-lg font-semibold">{selectedUnit.balcony_size} מ״ר</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => alert('הדמיה תלת-ממדית של הדירה - בקרוב!')}
                    className="flex-1"
                  >
                    <Building2 className="w-4 h-4 ml-2" />
                    הדמיה של הדירה
                  </Button>
                  <Button
                    onClick={() => handleViewDetails(selectedUnit)}
                    className="flex-1 bg-sky-500 hover:bg-sky-600"
                  >
                    <Eye className="w-4 h-4 ml-2" />
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