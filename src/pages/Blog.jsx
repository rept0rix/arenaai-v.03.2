import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft, Calendar, User, TrendingUp, Home, Calculator, Shield, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Blog() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'הכל', count: 24 },
        { id: 'market', name: 'מצב השוק', count: 8 },
        { id: 'investment', name: 'השקעות', count: 6 },
        { id: 'financing', name: 'מימון', count: 5 },
        { id: 'tips', name: 'טיפים', count: 5 }
    ];

    const featuredPost = {
        id: 1,
        title: "מה קורה בשוק הנדל\"ן הישראלי ב-2024? מגמות וחזיות",
        excerpt: "ניתוח מקיף של מצב השוק, שינויי המחירים, והשפעת המצב הכלכלי על הנדל\"ן. מה צופים המומחים לשנה הקרובה?",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        category: "מצב השוק",
        date: "15 בדצמבר 2024",
        author: "ארנה AI",
        readTime: "7 דקות קריאה",
        featured: true
    };

    const blogPosts = [
        {
            id: 2,
            title: "5 טיפים לבחירת דירה ראשונה - המדריך המקיף",
            excerpt: "כל מה שצריך לדעת לפני רכישת הדירה הראשונה: מבירור תקציב ועד חתימת החוזה.",
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "טיפים",
            date: "10 בדצמבר 2024",
            author: "צוות ארנה",
            readTime: "5 דקות קריאה"
        },
        {
            id: 3,
            title: "משכנתא משתנה או קבועה? השוואה מפורטת לשנת 2024",
            excerpt: "כל היתרונות והחסרונות של כל סוג משכנתא, כולל חישובים ודוגמאות מעשיות.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "מימון",
            date: "5 בדצמבר 2024",
            author: "יועץ מימון",
            readTime: "8 דקות קריאה"
        },
        {
            id: 4,
            title: "השקעה בנדל\"ן - המדריך השלם למתחילים",
            excerpt: "איך לבחור נכס להשקעה, מה החישובים החשובים, ואיך להעריך תשואה צפויה.",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "השקעות",
            date: "28 בנובמבר 2024",
            author: "מומחה השקעות",
            readTime: "10 דקות קריאה"
        },
        {
            id: 5,
            title: "שינויים חדשים במס רכישה - מה חשוב לדעת",
            excerpt: "עדכון על השינויים הקרובים בחוק המס, ואיך הם ישפיעו על רוכשי הדירות.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "מצב השוק",
            date: "22 בנובמבר 2024",
            author: "יועץ משפטי",
            readTime: "6 דקות קריאה"
        },
        {
            id: 6,
            title: "תמ\"א 38 - האם עדיין כדאי להיכנס לפרויקט?",
            excerpt: "ניתוח השינויים הקרובים בתמ\"א, סיכונים והזדמנויות לבעלי דירות.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "טיפים",
            date: "18 בנובמבר 2024",
            author: "מומחה תמ\"א",
            readTime: "7 דקות קריאה"
        },
        {
            id: 7,
            title: "איך לבחור שכונה - המדריך הסופי",
            excerpt: "הפרמטרים החשובים לבחירת שכונה: תחבורה, שירותים, פוטנציאל עליה במחירים.",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "טיפים",
            date: "12 בנובמבר 2024",
            author: "מומחה נדל\"ן",
            readTime: "9 דקות קריאה"
        }
    ];

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'מצב השוק': return <TrendingUp className="w-4 h-4" />;
            case 'השקעות': return <Calculator className="w-4 h-4" />;
            case 'מימון': return <Shield className="w-4 h-4" />;
            case 'טיפים': return <Home className="w-4 h-4" />;
            default: return <Home className="w-4 h-4" />;
        }
    };

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || 
                               categories.find(cat => cat.id === selectedCategory)?.name === post.category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="Blog" />
            
            <div className="max-w-7xl mx-auto p-6 py-12">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    חזרה
                </Button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">הבלוג של Arena</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        כתבות, טיפים ועדכונים מעולם הנדל"ן הישראלי
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="חיפוש בבלוג..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="rounded-full"
                                >
                                    {category.name} ({category.count})
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured Post */}
                <Card className="mb-12 overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 p-8">
                            <Badge className="mb-4 bg-sky-100 text-sky-800">
                                {getCategoryIcon(featuredPost.category)}
                                <span className="mr-2">{featuredPost.category}</span>
                            </Badge>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                                {featuredPost.title}
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {featuredPost.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {featuredPost.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        {featuredPost.author}
                                    </div>
                                    <span>{featuredPost.readTime}</span>
                                </div>
                                
                                <Button className="bg-sky-500 hover:bg-sky-600">
                                    קרא עוד
                                    <ChevronRight className="w-4 h-4 mr-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Card key={post.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <Badge className="absolute top-4 right-4 bg-white/90 text-slate-700">
                                    {getCategoryIcon(post.category)}
                                    <span className="mr-2">{post.category}</span>
                                </Badge>
                            </div>
                            
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm text-slate-500">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <span>{post.readTime}</span>
                                    </div>
                                    
                                    <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700 p-0">
                                        קרא עוד
                                        <ChevronRight className="w-3 h-3 mr-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">לא נמצאו תוצאות</h3>
                        <p className="text-slate-600 mb-6">נסה לחפש במילות מפתח אחרות או בחר קטגוריה אחרת</p>
                        <Button 
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                        >
                            נקה חיפוש
                        </Button>
                    </div>
                )}

                {/* CTA Section */}
                <Card className="mt-16 bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">מוכנים לפעולה?</h3>
                        <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                            קראתם את המדריכים והטיפים? עכשיו הזמן להתחיל את החיפוש האמיתי
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                onClick={() => navigate(createPageUrl('Home'))}
                                size="lg"
                                className="bg-sky-500 hover:bg-sky-600"
                            >
                                התחילו לחפש עם ארנה
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => navigate(createPageUrl('BuyingGuide'))}
                                size="lg"
                            >
                                מדריך רכישה מלא
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}