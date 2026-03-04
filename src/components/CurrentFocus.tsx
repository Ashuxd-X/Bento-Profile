import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const focusText = "Mastering Python Backend Architecture & Scalable APIs";

const CurrentFocus = () => {
  return (
    <motion.div
      className="premium-card p-4 md:p-5 flex items-center gap-5 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Active Indicator Hardware Style */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
        <div className="relative flex items-center justify-center w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
          <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-primary/60" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            Primary Instrument Focus
          </span>
        </div>
        <p className="text-sm font-bold text-foreground/90 truncate tracking-tight">
          {focusText}
        </p>
      </div>

      <div className="ml-auto hidden sm:flex items-center gap-1 opacity-20">
        <div className="w-1 h-3 bg-foreground rounded-full" />
        <div className="w-1 h-2 bg-foreground rounded-full" />
        <div className="w-1 h-4 bg-foreground rounded-full" />
      </div>
    </motion.div>
  );
};

export default CurrentFocus;
