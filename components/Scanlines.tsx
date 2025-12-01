import React from 'react';

const Scanlines: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
      {/* Scanlines Pattern */}
      <div 
        className="absolute inset-0 bg-repeat"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%',
        }}
      />
      {/* Vignette / Screen Curve Darkening */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      {/* Subtle screen tint */}
      <div className="absolute inset-0 bg-green-900 mix-blend-overlay opacity-20" />
    </div>
  );
};

export default Scanlines;