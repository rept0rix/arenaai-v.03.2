import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Eye, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProjectFloorplan({ projectId, properties, userFilters }) {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
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

  // Group properties by floor and type
  const propertyMap = {};
  properties.forEach(prop => {
    const floor = prop.floor || 0;
    if (!propertyMap[floor]) propertyMap[floor] = {};
    const type = prop.unit_type || 'A';
    if (!propertyMap[floor][type]) propertyMap[floor][type] = [];
    propertyMap[floor][type].push(prop);
  });

  const floors = Object.keys(propertyMap).sort((a, b) => b - a);
  const types = ['A', 'B', 'C', 'D', 'P'];

  // Apply filters
  const filteredProperties = properties.filter(prop => {
    const statusMatch = filterStatus === 'all' || prop.status === filterStatus;
    const typeMatch = filterType === 'all' || prop.unit_type === filterType;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600';
      case 'reserved': return 'bg-orange-500 hover:bg-orange-600';
      case 'sold': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-slate-300';
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
            <div className="text-left">
              <div className="text-sm text-slate-600">סה״כ דירות</div>
              <div className="text-2xl font-bold text-slate-900">{properties.length}</div>
            </div>
          </div>
        </CardHeader>
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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-slate-600" />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-sky-500' : ''}
                >
                  הכל
                </Button>
                <Button
                  variant={filterStatus === 'available' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('available')}
                  className={filterStatus === 'available' ? 'bg-green-500' : ''}
                >
                  פנוי
                </Button>
                <Button
                  variant={filterStatus === 'reserved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('reserved')}
                  className={filterStatus === 'reserved' ? 'bg-orange-500' : ''}
                >
                  שמור
                </Button>
                <Button
                  variant={filterStatus === 'sold' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('sold')}
                  className={filterStatus === 'sold' ? 'bg-red-500' : ''}
                >
                  נמכר
                </Button>
              </div>
            </div>
            <Button
              variant={isCompareMode ? 'default' : 'outline'}
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={isCompareMode ? 'bg-sky-500' : ''}
            >
              {isCompareMode ? 'מצב השוואה פעיל' : 'השווה דירות'}
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-6 w-px bg-slate-300"></div>
            <div className="flex gap-2">
              {types.map(type => (
                <Button
                  key={type}
                  variant={filterType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className={filterType === type ? 'bg-sky-500' : ''}
                >
                  טיפוס {type}
                </Button>
              ))}
            </div>
            {(filterStatus !== 'all' || filterType !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterStatus('all');
                  setFilterType('all');
                }}
              >
                <X className="w-4 h-4 ml-1" />
                נקה סינון
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Floorplan Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>מפת דירות</CardTitle>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => alert('הדמיה תלת-ממדית של הבניין - בקרוב!')}
            >
              <Building2 className="w-4 h-4" />
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
                      const unitsInCell = propertyMap[floor]?.[type] || [];
                      const visibleUnits = unitsInCell.filter(prop => {
                        const statusMatch = filterStatus === 'all' || prop.status === filterStatus;
                        const typeMatch = filterType === 'all' || prop.unit_type === filterType;
                        return statusMatch && typeMatch;
                      });

                      return (
                        <td key={`${floor}-${type}`} className="border border-slate-300 p-2">
                          <div className="flex flex-col gap-1">
                            {visibleUnits.length > 0 ? (
                             visibleUnits.map(prop => {
                               const matchScore = calculateMatchScore(prop);
                               return (
                                 <button
                                   key={prop.id}
                                   onClick={() => handleUnitClick(prop)}
                                   className={`${
                                     isCompareMode && selectedForCompare.includes(prop.id)
                                       ? 'ring-2 ring-sky-500 ring-offset-2'
                                       : ''
                                   } ${getStatusColor(prop.status)} text-white px-2 py-1 rounded text-xs font-medium transition-all transform hover:scale-105 cursor-pointer relative`}
                                   title={`${getStatusText(prop.status)} - ${prop.rooms} חדרים - ₪${prop.price?.toLocaleString()}${matchScore ? ` - התאמה ${matchScore}%` : ''}`}
                                 >
                                   {isCompareMode && selectedForCompare.includes(prop.id) && (
                                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs">
                                       ✓
                                     </div>
                                   )}
                                   <div>{prop.rooms}ח׳ - ₪{(prop.price / 1000000).toFixed(1)}M</div>
                                   {matchScore && (
                                     <div className="text-[10px] font-bold bg-white/20 rounded px-1 mt-0.5">
                                       {matchScore}% התאמה
                                     </div>
                                   )}
                                 </button>
                               );
                             })
                            ) : unitsInCell.length > 0 ? (
                              <div className="text-center text-slate-400 text-xs py-1">
                                מסונן
                              </div>
                            ) : (
                              <div className="text-center text-slate-300 text-xs py-1">-</div>
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
          <div className="mt-4 flex gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-slate-600">פנוי</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-slate-600">שמור</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-slate-600">נמכר</span>
            </div>
          </div>
        </CardContent>
      </Card>

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