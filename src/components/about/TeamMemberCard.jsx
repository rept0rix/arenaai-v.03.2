import React from 'react';
import { User, Linkedin } from 'lucide-react';

export default function TeamMemberCard({ member }) {
    return (
        <div className="flex items-center w-full max-w-lg mx-auto">
            {/* Text Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 pl-24 flex-1 relative z-0 mr-[-64px]">
                <div className="text-right">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {member.name}
                    </h3>
                    {member.role && (
                        <p className="text-base font-medium text-sky-600 mb-3">
                            {member.role}
                        </p>
                    )}
                    {member.description && (
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {member.description}
                        </p>
                    )}
                </div>
            </div>
            
            {/* Profile Image */}
            <div className="relative flex-shrink-0 z-10">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-xl ring-4 ring-sky-400/50">
                    {member.image ? (
                        <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                            <User className="w-16 h-16 text-slate-400" />
                        </div>
                    )}
                </div>
                
                {/* LinkedIn Badge */}
                {member.linkedin && (
                    <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-1 -left-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg border-2 border-white"
                    >
                        <Linkedin className="w-5 h-5 text-white" />
                    </a>
                )}
            </div>
        </div>
    );
}