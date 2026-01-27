import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Eye, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ProjectComparisonTable({ properties, onParameterClick }) {
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);

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

  // Mock match scores for demo (in real app, these come from explainability)
  const getMatchScore = (property) => {
    // Demo: return different scores for each property
    const scores = {
      0: 98,
      1: 85,
      2: 72,
      3: 65,
      4: 58
    };
    const index = properties.findIndex(p => p.id === property.id);
    return scores[index] || 70;
  };

  // Mock top parameters (Top Positives & Negatives)
  // In real app, these come from explainability analysis
  const getTopParameters = (property) => {
    const index = properties.findIndex(p => p.id === property.id);
    
    // Different parameters for each property to show variance
    const parametersByProperty = {
      0: [
        { label: 'מחיר', key: 'price', contribution: 0.85, type: 'price' },
        { label: 'חדרים', key: 'rooms', contribution: 0.75, type: 'text' },
        { label: 'קומה', key: 'floor', contribution: 0.65, type: 'text' },
        { label: 'כיוון', key: 'facing', contribution: 0.55, type: 'text' },
        { label: 'מרפסת', key: 'balcony_size', contribution: -0.35, type: 'sqm' },
      ],
      1: [
        { label: 'שטח', key: 'size', contribution: 0.80, type: 'sqm' },
        { label: 'מחיר', key: 'price', contribution: 0.70, type: 'price' },
        { label: 'חדרים', key: 'rooms', contribution: 0.60, type: 'text' },
        { label: 'קומה', key: 'floor', contribution: -0.40, type: 'text' },
      ],
      2: [
        { label: 'כיוון', key: 'facing', contribution: 0.75, type: 'text' },
        { label: 'חדרים', key: 'rooms', contribution: 0.65, type: 'text' },
        { label: 'שטח', key: 'size', contribution: 0.55, type: 'sqm' },
        { label: 'מחיר', key: 'price', contribution: -0.50, type: 'price' },
        { label: 'קומה', key: 'floor', contribution: -0.30, type: 'text' },
      ],
    };

    return parametersByProperty[index] || parametersByProperty[0];
  };

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

  const getContributionColor = (contribution) => {
    if (contribution >= 0.6) {
      return { bg: '#E8F4F2', text: '#1F6F6A', border: '#1F6F6A' }; // חיזוק משמעותי
    } else if (contribution <= -0.4) {
      return { bg: '#F6E9EE', text: '#7A2E3A', border: '#7A2E3A' }; // נקודת חולשה
    }
    return { bg: 'transparent', text: '#4A5D73', border: 'transparent' }; // ניטרלי
  };

  const handleParameterClick = (paramLabel, property) => {
    if (onParameterClick) {
      onParameterClick(paramLabel, property);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header with Help Bubble */}
      <div className="relative">
        <div className="text-right mb-2">
          <div className="flex items-center justify-start gap-3">
            <Popover open={helpOpen} onOpenChange={setHelpOpen}>
              <PopoverTrigger asChild>
                <button 
                  className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 transition-colors group"
                  onMouseEnter={() => setHelpOpen(true)}
                  onMouseLeave={() => setHelpOpen(false)}
                >
                  <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:underline">רוצה להבין איך לקרוא את ההשוואה?</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-96 text-right" side="bottom" align="start">
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900">איך לקרוא את ההשוואה הזו</h4>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div>
                      <strong>1. אחוז ההתאמה</strong>
                      <p className="text-slate-600 mt-1">מראה עד כמה הנכס מתאים למה שסיפרת ל-Arena בשיחה ובבחירות שלך.</p>
                    </div>
                    <div>
                      <strong>2. ההבדלים בין הנכסים</strong>
                      <p className="text-slate-600 mt-1">כל שורה מדגישה מה חיזק או החליש את ההתאמה של כל נכס ביחס לאחרים.</p>
                    </div>
                    <div>
                      <strong>3. רוצה להבין למה?</strong>
                      <p className="text-slate-600 mt-1">אפשר ללחוץ על כל פריט ו-Arena תסביר בצ׳אט למה זה מתאים - או פחות.</p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <h2 className="text-2xl font-bold text-slate-900">השוואה לפי מה שחשוב לך</h2>
          </div>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            הקריטריונים שמוצגים כאן הם אלו שהשפיעו הכי הרבה על ציון ההתאמה שלך.<br />
            הערכים בטבלה הם נתונים אמיתיים של כל נכס.<br />
            רוצה להבין למה? לחיצה על כל פרמטר פותחת הסבר אישי בשיחה עם Arena.
          </p>
        </div>
      </div>

      {/* Property Headers */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${properties.length}, 1fr)` }}>
        <div></div>
        {properties.map((property, index) => {
          const matchScore = getMatchScore(property);
          return (
            <Card key={property.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-sm">
                  דירה {index + 1}
                </CardTitle>
                {/* Match Score */}
                <div className="text-center mt-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-white">
                    <span className="text-2xl font-bold">{matchScore}%</span>
                  </div>
                </div>
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
                  className="w-full flex-row-reverse"
                  onClick={() => navigate(createPageUrl(`PropertyDetails?id=${property.id}`), {
                    state: { property }
                  })}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  צפה בפרטים
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table - Only Top Parameters */}
      <Card style={{ backgroundColor: '#FFFFFF' }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <tbody>
                {properties[0] && getTopParameters(properties[0]).map((param, paramIndex) => {
                  const isFirstParam = paramIndex === 0;
                  return (
                    <tr
                      key={param.key}
                      style={{
                        backgroundColor: paramIndex % 2 === 0 ? '#F7FAFD' : '#FFFFFF',
                        borderBottom: '1px solid #E6EEF6'
                      }}
                    >
                      <td 
                        className="p-4 font-semibold w-48 text-right"
                        style={{ color: '#334155' }}
                      >
                        {param.label}
                      </td>
                      {properties.map((property, propIndex) => {
                        const topParams = getTopParameters(property);
                        const matchingParam = topParams.find(p => p.key === param.key);
                        const contribution = matchingParam ? matchingParam.contribution : 0;
                        const colors = getContributionColor(contribution);
                        
                        return (
                          <td
                            key={property.id}
                            className="p-4 text-center cursor-pointer hover:opacity-80 transition-opacity relative group"
                            style={{
                              backgroundColor: colors.bg,
                              color: colors.text,
                              borderRight: propIndex > 0 ? '1px solid #D9E5F2' : 'none',
                              borderLeft: `4px solid ${colors.border}`
                            }}
                            onClick={() => handleParameterClick(param.label, property)}
                            title="איך זה השפיע על ההתאמה שלך?"
                          >
                            {renderValue(property, param)}
                            <div className="absolute inset-0 bg-sky-100 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6 justify-start flex-wrap text-right">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E8F4F2', border: '1px solid #1F6F6A' }}></div>
              <span className="text-sm text-slate-600">חיזוק משמעותי</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-white border border-slate-300"></div>
              <span className="text-sm text-slate-600">ניטרלי</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F6E9EE', border: '1px solid #7A2E3A' }}></div>
              <span className="text-sm text-slate-600">נקודת חולשה</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}