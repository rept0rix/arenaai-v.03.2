import React from 'react';

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 opacity-60" />
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Circle */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-sky-400/20 to-blue-500/20 blur-3xl animate-float"
          style={{
            top: '10%',
            right: '10%',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        
        {/* Medium Circle */}
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-sky-500/20 blur-3xl animate-float-delayed"
          style={{
            bottom: '15%',
            left: '15%',
            animation: 'float 25s ease-in-out infinite 5s'
          }}
        />
        
        {/* Small Circle */}
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-3xl animate-float-slow"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'float 30s ease-in-out infinite 10s'
          }}
        />
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}