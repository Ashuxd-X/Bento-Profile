import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const focusText = "Mastering Python Backend Architecture & Scalable APIs";

const CurrentFocus = () => {
  return (
    <motion.div
      className="glass-card p-4 flex items-center gap-4 relative overflow-hidden hover-lift"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Pulsing Green Dot (Unchanged) */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <motion.span 
          className="absolute inline-flex h-6 w-6 rounded-full bg-status/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.span 
          className="absolute inline-flex h-4 w-4 rounded-full bg-status opacity-75"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.75, 0.3, 0.75],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.2,
          }}
        />
        <motion.span 
          className="relative inline-flex h-3 w-3 rounded-full bg-status"
          animate={{
            boxShadow: [
              "0 0 0 0 hsl(142 76% 45% / 0)",
              "0 0 10px 5px hsl(142 76% 45% / 0.4)",
              "0 0 0 0 hsl(142 76% 45% / 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content Section - UPDATED */}
      <div className="flex-1 min-w-0 relative z-10 overflow-hidden">
        <motion.div 
          className="flex items-center gap-2 mb-0.5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Current Focus
          </span>
          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Zap className="w-3 h-3 text-yellow-500" />
          </motion.div>
        </motion.div>

        {/* Marquee Text Effect */}
        <div className="relative w-full overflow-hidden mask-linear-gradient">
          <motion.div
            className="flex whitespace-nowrap gap-8"
            animate={{ x: "-50%" }} 
            transition={{
              duration: 15, // Speed of the scroll (higher = slower)
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ width: "fit-content" }}
          >
            {/* We repeat the text twice to create a seamless loop */}
            <p className="text-sm font-medium text-foreground">
              {focusText}
            </p>
            <p className="text-sm font-medium text-foreground">
              {focusText}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentFocus;
