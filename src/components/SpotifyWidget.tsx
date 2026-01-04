import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";

const SpotifyWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <motion.div
      className="glass-card overflow-hidden relative h-full w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between"
      whileHover={{ scale: 1.02 }}
    >
      <audio 
        ref={audioRef} 
        src="/Music/ALL_IN_ONE.mp3" 
        loop 
        onError={(e) => console.log("Audio Error:", e)}
      />

      {/* 1. Top Row: Info & SPINNING LOCAL IMAGE */}
      <div className="flex justify-between items-start w-full z-10">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
             Aura 🔥
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 flex items-center gap-1">
             <Music size={10} /> Mix-Ashuxd
          </p>
        </div>

        {/* --- SPINNING ALBUM ART --- */}
        <motion.div
            className="relative w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
                duration: 3,             
                repeat: Infinity,        
                ease: "linear",          
                repeatType: "loop" 
            }}
        >
            {/* LINK TO LOCAL FILE HERE 
               Make sure your file is at: public/Music/cover.png
            */}
            <img 
                src="/Music/cover.png" 
                alt="Album Art" 
                className="w-full h-full object-cover"
            />
            
            {/* Center Dot for 'Vinyl' look */}
            <div className="absolute inset-0 m-auto w-2 h-2 bg-slate-900 dark:bg-white rounded-full z-10" />
        </motion.div>
      </div>

      {/* 2. Middle: Visual Waveform */}
      <div className="flex items-center justify-center gap-1 h-12 my-2">
        {[1, 2, 3, 4, 5, 6].map((bar) => (
          <motion.div
            key={bar}
            className="w-1.5 bg-indigo-500 rounded-full"
            animate={{ 
              height: isPlaying ? [12, 32, 12] : 4,
              opacity: isPlaying ? 1 : 0.3 
            }}
            transition={{ 
              duration: 0.8, 
              repeat: isPlaying ? Infinity : 0,
              repeatType: "reverse",
              delay: bar * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 3. Bottom: Controls */}
      <div className="flex flex-col gap-3 z-10">
        <div className="flex items-center justify-center gap-4">
          <SkipBack size={16} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer" />
          
          <button 
            onClick={togglePlay}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 transition-transform shadow-lg"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
          
          <SkipForward size={16} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer" />
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: "0%" }}
            animate={{ width: isPlaying ? "100%" : "0%" }}
            transition={{ duration: isPlaying ? 180 : 0.5, ease: "linear" }}
          />
        </div>
      </div>

      <motion.div 
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10 z-0 pointer-events-none" 
      />
    </motion.div>
  );
};

export default SpotifyWidget;