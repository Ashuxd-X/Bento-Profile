import { motion } from "framer-motion";
import defaultProfileImg from "../assets/profile.jpg";

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  imageSrc?: string;
  isOpenToWork?: boolean;
}

const ProfileCard = ({
  name,
  title,
  bio,
  imageSrc = defaultProfileImg,
  isOpenToWork = true
}: ProfileCardProps) => {
  return (
    <motion.div
      className="premium-card p-8 md:p-10 text-center relative h-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Avatar Container */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-border/50 relative z-10 bg-secondary">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              loading="eager"
            />
          </div>

          {/* Status Indicator Embedded */}
          {isOpenToWork && (
            <div className="absolute -bottom-1 -right-1 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-emerald-500/20 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Available</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Content Block */}
      <div className="relative z-10 space-y-3">
        <motion.h1
          className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gradient-premium leading-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="text-sm md:text-base font-semibold text-primary/80 uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.p>

        <motion.p
          className="text-foreground/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {bio}
        </motion.p>
      </div>

      {/* Decorative Scan Line */}
      <div className="scan-effect absolute inset-0 opacity-10 pointer-events-none" />
    </motion.div>
  );
};

export default ProfileCard;
