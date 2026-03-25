import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-[999] bg-[#070707] flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDone ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* 1. Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 border border-emerald-500/30 rounded-full animate-[ping_2s_infinite]" />
        <div className="absolute w-40 h-40 border border-emerald-500/10 rounded-full animate-[ping_3s_infinite]" />
      </div>

      {/* 2. Main Branding Section */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden h-12 mb-2">
          <h1 className={`text-4xl font-semibold tracking-tighter text-white transition-all duration-700 ${isDone ? 'translate-y-full' : 'translate-y-0'}`}>
            Perplexity
          </h1>
        </div>
        
        {/* Animated Progress Line */}
        <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500 animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>

      {/* 3. Background Grain/Noise (Subtle Modern Touch) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;