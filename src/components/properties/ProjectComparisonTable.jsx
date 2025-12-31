import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProjectComparisonTable({ properties }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'reserved': return 'bg-orange-500';
      case 'sold': return 'bg-red-500';
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

  const comparisonRows = [
    { label: 'סטטוס', key: 'status', type: 'status' },
    { label: 'מחיר', key: 'price', type: 'price' },
    { label: 'קומה', key: 'floor', type: 'text' },
    { label: 'טיפוס', key: 'unit_type', type: 'text' },
    { label: 'חדרים', key: 'rooms', type: 'text' },
    { label: 'שטח', key: 'size', type: 'sqm' },
    { label: 'כיוון', key: 'facing', type: 'text' },
    { label: 'מרפסת', key: 'balcony_size', type: 'sqm' },
    { label: 'חניה', key: 'parking', type: 'boolean' },
    { label: 'מעלית', key: 'elevator', type: 'boolean' },
    { label: 'מחסן', key: 'storage_size', type: 'sqm' },
  ];

  const renderValue = (property, row) => {
    const value = property[row.key];

    switch (row.type) {
      case 'status':
        return (
          <Badge className={`${getStatusColor(value)} text-white`}>
            {getStatusText(value)}
          </Badge>
        );
      case 'price':
        return value ? (
          <div className="font-bold text-lg">₪{value.toLocaleString()}</div>
        ) : '-';
      case 'sqm':
        return value ? `${value} מ"ר` : '-';
      case 'boolean':
        return value ? (
          <Check className="w-5 h-5 text-green-500 mx-auto" />
        ) : (
          <X className="w-5 h-5 text-red-500 mx-auto" />
        );
      case 'text':
        return value || '-';
      default:
        return value || '-';
    }
  };

  // Find best values for highlighting
  const findBestValue = (row) => {
    if (row.type === 'price') {
      return Math.min(...properties.map(p => p[row.key] || Infinity));
    }
    if (row.type === 'sqm' || row.key === 'rooms') {
      return Math.max(...properties.map(p => p[row.key] || 0));
    }
    return null;
  };

  const isBestValue = (property, row) => {
    const bestValue = findBestValue(row);
    if (bestValue === null) return false;
    return property[row.key] === bestValue;
  };

  return (
    <div className="space-y-6">
      {/* Property Headers */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
        <div></div>
        {properties.map((property, index) => (
          <Card key={property.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-sm">
                דירה {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <img
                src={property.image_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80'}
                alt={`דירה ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => navigate(createPageUrl(`PropertyDetails?id=${property.id}`), {
                  state: { property }
                })}
              >
                <Eye className="w-4 h-4 ml-2" />
                צפה בפרטים
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {comparisonRows.map((row, rowIndex) => (
                  <tr
                    key={row.key}
                    className={`border-b border-slate-200 ${
                      rowIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <td className="p-4 font-semibold text-slate-700 w-48">
                      {row.label}
                    </td>
                    {properties.map(property => (
                      <td
                        key={property.id}
                        className={`p-4 text-center ${
                          isBestValue(property, row) ? 'bg-green-50' : ''
                        }`}
                      >
                        {renderValue(property, row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
              <span className="text-sm text-slate-600">ערך הטוב ביותר</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}