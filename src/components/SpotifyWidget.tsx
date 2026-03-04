import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const SpotifyWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
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
      className="premium-card overflow-hidden relative h-full w-full p-5 flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <audio
        ref={audioRef}
        src="/Music/ALL_IN_ONE.mp3"
        loop
      />

      {/* Dashboard Top Row */}
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
            <h3 className="text-xs font-bold text-foreground tracking-tight">
              Aura Dashboard
            </h3>
          </div>
          <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-widest pl-3.5">
            Mix-Ashuxd
          </p>
        </div>

        {/* Floating Album Art with Groove */}
        <motion.div
          className="relative w-12 h-12 rounded-xl border border-border/50 overflow-hidden shadow-xl"
          animate={{ rotate: isPlaying ? [0, 5, 0, -5, 0] : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/Music/cover.png"
            alt="Album Art"
            className="w-full h-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* High Fidelity Waveform */}
      <div className="flex items-end justify-center gap-1.5 h-14 w-full px-2 relative z-10">
        {[20, 45, 80, 50, 60, 30, 70, 40, 90, 55].map((height, i) => (
          <motion.div
            key={i}
            className="w-1 bg-[#1DB954]/60 rounded-full"
            animate={{
              height: isPlaying ? [`${height}%`, `${height / 2}%`, `${height}%`] : "15%",
              opacity: isPlaying ? 1 : 0.2
            }}
            transition={{
              duration: 0.6 + (i * 0.1),
              repeat: isPlaying ? Infinity : 0,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Control Module */}
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <SkipBack size={14} className="text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer" />
            <SkipForward size={14} className="text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer" />
          </div>

          <button
            onClick={togglePlay}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-foreground text-background hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer ring-4 ring-foreground/5"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
        </div>

        {/* Progress System */}
        <div className="space-y-1.5">
          <div className="w-full bg-secondary/50 h-1 rounded-full overflow-hidden border border-border/10">
            <motion.div
              className="h-full bg-[#1DB954] rounded-full shadow-[0_0_8px_rgba(29,185,84,0.4)]"
              initial={{ width: "0%" }}
              animate={{ width: isPlaying ? "100%" : "0%" }}
              transition={{ duration: isPlaying ? 180 : 0.5, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest px-0.5">
            <span>01:12</span>
            <span>03:45</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpotifyWidget;