import React, { useState, useEffect, useRef } from 'react';
import Scanlines from './Scanlines';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "BIOS DATE 01/01/85 14:22:56 VER 1.02",
  "CPU: GEMINI QUANTUM CORE @ 8MHz",
  "DETECTING PRIMARY MASTER ... 20MB HDD",
  "DETECTING PRIMARY SLAVE ... NONE",
  "640K RAM SYSTEM 640K OK",
  "INITIALIZING VIDEO ADAPTER...... OK",
  "LOADING KERNEL...",
  "MOUNTING VIRTUAL DRIVES...",
  "CHECKING PERIPHERALS...",
  "KEYBOARD DETECTED",
  "LOADING NEURAL NETWORKS...",
  "ESTABLISHING UPLINK...",
  "HANDSHAKE INITIATED...",
  "DECRYPTING PROTOCOLS...",
  "SYSTEM READY."
];

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Random duration between 3s and 8s
  const durationRef = useRef(Math.floor(Math.random() * 5000) + 3000); 

  useEffect(() => {
    const startTime = Date.now();
    const duration = durationRef.current;
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      // Calculate how many logs should be shown based on progress
      const totalLogs = BOOT_LOGS.length;
      const logsToShowCount = Math.floor((newProgress / 100) * totalLogs);
      
      if (logsToShowCount > logs.length) {
         setLogs(BOOT_LOGS.slice(0, logsToShowCount));
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Small pause at 100%
      }
    }, 50);

    return () => clearInterval(interval);
  }, [logs.length, onComplete]);

  // Auto scroll logs
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-terminal overflow-hidden flex flex-col items-center justify-center z-50 selection:bg-green-500 selection:text-black">
      <Scanlines />
      
      <div className="w-full max-w-3xl p-8 z-10 flex flex-col gap-8">
        {/* Header Info */}
        <div className="flex justify-between border-b-2 border-green-800 pb-2 mb-4 uppercase tracking-widest text-xl">
            <span>RetroBIOS v2.5</span>
            <span>Mem: 640K</span>
        </div>

        {/* Logs Area */}
        <div 
          ref={containerRef}
          className="h-72 overflow-y-auto font-mono text-xl flex flex-col gap-1 scrollbar-hide border border-green-900 bg-black bg-opacity-50 p-4 shadow-[0_0_15px_rgba(0,255,0,0.1)]"
        >
          {logs.map((log, index) => (
            <div key={index} className="whitespace-nowrap">
              <span className="opacity-50 mr-4">[{new Date(Date.now() - (logs.length - index) * 1000).toLocaleTimeString('en-US', {hour12:false})}]</span>
              {log}
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full border-2 border-green-800 p-1 mt-auto shadow-[0_0_10px_rgba(0,255,0,0.2)]">
          <div 
            className="h-8 bg-green-600 transition-all duration-75 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
             {/* Striped pattern for the progress bar */}
             <div className="absolute inset-0 w-full h-full" 
                  style={{
                    backgroundImage: 'linear-gradient(45deg,rgba(0,0,0,.1) 25%,transparent 25%,transparent 50%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.1) 75%,transparent 75%,transparent)',
                    backgroundSize: '20px 20px'
                  }} 
             />
          </div>
        </div>
        
        <div className="flex justify-between text-lg uppercase tracking-widest mt-2">
            <span className="animate-pulse">BOOTING SYSTEM...</span>
            <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;