import React, { useState, useEffect } from 'react';
import { SearchHistory } from '@/entities/SearchHistory';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';

export default function History() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthAndLoadHistory();
    }, []);

    const checkAuthAndLoadHistory = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            await loadHistory();
        } catch (error) {
            // User not authenticated, redirect to login
            navigate(createPageUrl('Landing'));
        }
    };

    const loadHistory = async () => {
        setIsLoading(true);
        try {
            const historyData = await SearchHistory.list('-created_date');
            setHistory(historyData);
        } catch (error) {
            console.error('Error loading history:', error);
        }
        setIsLoading(false);
    };

    const handleViewComparison = (item) => {
        if (item.type === 'comparison' && item.propertyIds?.length > 0) {
            const filtersParam = item.filters ? encodeURIComponent(JSON.stringify(item.filters)) : '';
            const url = createPageUrl(`PropertyComparison?ids=${item.propertyIds.join(',')}&filters=${filtersParam}`);
            navigate(url);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="History" />
            
            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 ml-2" />
                        חזרה
                    </Button>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        היסטוריית החיפושים שלי
                    </h1>
                    <p className="text-slate-600">
                        כל השוואות וחיפושי הנכסים שביצעת
                    </p>
                </div>

                {/* History Content */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                        <p className="text-slate-600">טוען היסטוריה...</p>
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center py-12">
                        <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">עדיין לא ביצעת חיפושים</h3>
                        <p className="text-slate-600 mb-6">התחל לחפש נכסים כדי לראות כאן את ההיסטוריה שלך</p>
                        <Button onClick={() => navigate(createPageUrl('Home'))}>
                            התחל חיפוש
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {history.map((item) => (
                            <Card key={item.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-xs">
                                                {item.type === 'comparison' ? 'השוואה' : 'חיפוש'}
                                            </Badge>
                                            <span className="text-sm text-slate-500">
                                                {formatDate(item.created_date)}
                                            </span>
                                        </div>
                                        {item.type === 'comparison' && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewComparison(item)}
                                            >
                                                <Eye className="w-4 h-4 ml-1" />
                                                צפה שוב
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                
                                <CardContent>
                                    {item.propertiesSnapshot && item.propertiesSnapshot.length > 0 && (
                                        <div>
                                            <h4 className="font-medium mb-3">נכסים שהושוו:</h4>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {item.propertiesSnapshot.map((property, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                        <img
                                                            src={property.image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=100&q=80'}
                                                            alt={property.title}
                                                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h5 className="font-medium text-sm truncate">{property.title}</h5>
                                                            <p className="text-xs text-slate-500 truncate">{property.location}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {item.filters && Object.keys(item.filters).length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-slate-200">
                                            <h4 className="font-medium mb-2 text-sm">פילטרים שהופעלו:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(item.filters).map(([key, value]) => (
                                                    <Badge key={key} variant="secondary" className="text-xs">
                                                        {typeof value === 'object' ? JSON.stringify(value) : `${value}`}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}