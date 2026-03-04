import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapCard = () => {
  return (
    <motion.div
      className="premium-card p-6 h-full min-h-[160px] flex flex-col items-center justify-center text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Instrument Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

      <motion.div
        className="w-12 h-12 feature-icon-wrapper mb-4 group"
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <MapPin className="w-5 h-5 text-rose-500 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
      </motion.div>

      <div className="space-y-1 relative z-10">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
          Current Base
        </p>
        <p className="text-sm font-bold text-foreground tracking-tight">
          India <span className="text-base">🇮🇳</span>
        </p>
      </div>

      {/* Decorative Corner Detail */}
      <div className="absolute bottom-2 right-2 opacity-20">
        <div className="w-4 h-4 border-b border-r border-foreground" />
      </div>
    </motion.div>
  );
};

export default MapCard;
