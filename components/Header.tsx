import React, { useState, useEffect } from 'react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
  const formattedTime = time.toLocaleTimeString('en-US', { hour12: false });

  const isRetro = theme === 'retro';

  return (
    <div className={`border-b-2 p-4 flex justify-between items-center select-none sticky top-0 z-40 transition-all duration-300
      ${isRetro ? 'bg-black bg-opacity-90 border-green-800 shadow-[0_0_20px_rgba(0,255,0,0.1)]' : 'bg-black border-white shadow-none'}`}>
      
      <div className="flex items-center gap-4">
        {isRetro ? (
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#0f0]"></div>
        ) : (
          <div className="h-3 w-3 bg-white animate-pulse"></div>
        )}
        <h1 className={`font-digital text-2xl tracking-widest uppercase transition-colors duration-300
          ${isRetro ? 'text-green-500 [text-shadow:0_0_10px_rgba(0,255,0,0.7)]' : 'text-white'}`}>
          GEMINI<span className={`mx-1 ${isRetro ? 'text-green-800' : 'text-gray-500'}`}>-</span>TERMINAL<span className="text-xs align-top ml-1 opacity-70">v2.5</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Settings / Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          className={`hidden sm:block text-xs uppercase tracking-widest border px-2 py-1 transition-all
            ${isRetro 
              ? 'border-green-800 text-green-700 hover:text-green-400 hover:border-green-400 font-terminal' 
              : 'border-white text-white hover:bg-gray-800 font-seven-segment'
            }`}
        >
          [THEME: {theme.toUpperCase()}]
        </button>

        <div className="flex flex-col items-end">
          <div className={`tracking-widest leading-none transition-colors duration-300
            ${isRetro ? 'font-digital text-3xl text-red-500 [text-shadow:0_0_10px_rgba(255,0,0,0.7)]' : 'font-seven-segment text-3xl text-white'}`}>
            {formattedTime}
          </div>
          <div className={`text-lg transition-colors duration-300
            ${isRetro ? 'font-terminal text-green-700' : 'font-seven-segment text-gray-400 text-sm mt-1'}`}>
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;