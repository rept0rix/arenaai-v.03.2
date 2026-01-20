import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Target, TrendingUp, Star, AlertCircle, DollarSign } from 'lucide-react';

export default function BuyerSnapshotCard({ profile }) {
  if (!profile) return null;

  return (
    <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-600" />
          פרופיל קונה - Buyer Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type & Maturity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">סוג רוכש</span>
            </div>
            <Badge className="bg-purple-100 text-purple-800 text-base px-3 py-1">
              {profile.type}
            </Badge>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">רמת בשלות</span>
            </div>
            <Badge className={
              profile.maturity === 'מוכן לפגישה' ? 'bg-green-100 text-green-800' :
              profile.maturity === 'השוואה' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            } className="text-base px-3 py-1">
              {profile.maturity}
            </Badge>
          </div>
        </div>

        {/* Motivations */}
        {profile.motivations && profile.motivations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">מניעים מרכזיים</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.motivations.map((motivation, idx) => (
                <Badge key={idx} variant="outline" className="bg-sky-50">
                  {motivation}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Top 3 Preferences */}
        {profile.top_3_preferences && profile.top_3_preferences.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">מה חשוב לו (Top 3)</span>
            </div>
            <div className="space-y-2">
              {profile.top_3_preferences.slice(0, 3).map((pref, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                  <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700">{pref}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Budget Range */}
        {profile.budget_range && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">טווח תקציב</span>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200">
              <span className="text-slate-700">{profile.budget_range}</span>
            </div>
          </div>
        )}

        {/* Project Explainability */}
        {profile.project_explainability && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">למה הפרויקט הזה מתאים</span>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-50 to-sky-50 rounded border border-purple-200">
              <p className="text-slate-700 leading-relaxed">{profile.project_explainability}</p>
            </div>
          </div>
        )}

        {/* Key Concerns */}
        {profile.key_concerns && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-slate-600">חששות מרכזיים</span>
            </div>
            <div className="p-3 bg-orange-50 rounded border border-orange-200">
              <p className="text-slate-700 leading-relaxed">{profile.key_concerns}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}