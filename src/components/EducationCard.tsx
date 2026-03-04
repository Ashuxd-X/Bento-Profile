import { motion } from "framer-motion";
import { GraduationCap, Calendar, ArrowUpRight } from "lucide-react";

const EducationCard = () => {
  return (
    <motion.div
      className="premium-card p-6 h-full relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
            <GraduationCap className="w-3 h-3" />
            Academic Base
          </h2>
          <div className="h-px w-8 bg-border/40" />
        </div>

        <div className="flex gap-5 items-start">
          <div className="feature-icon-wrapper w-12 h-12 flex-shrink-0 group">
            <GraduationCap className="w-5 h-5 text-amber-500 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-sm font-bold text-foreground tracking-tight leading-snug">
              B.Tech in Electronics & Communication
            </h3>

            <div className="flex flex-col gap-1.5 pt-1">
              <a href="https://nist.edu/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-primary/80 hover:text-primary transition-colors flex items-center gap-1.5">
                NIST University, Odisha
                <ArrowUpRight className="w-2.5 h-2.5 opacity-50" />
              </a>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/30 border border-border/40 w-fit">
                <Calendar className="w-3 h-3 text-muted-foreground/60" />
                <span className="text-[10px] font-bold text-muted-foreground/80 tracking-widest uppercase">2021 — 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle corner hardware detail */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-20">
        <div className="w-1 h-1 bg-foreground rounded-full" />
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </div>
    </motion.div>
  );
};

export default EducationCard;
