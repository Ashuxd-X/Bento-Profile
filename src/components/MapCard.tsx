import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapCard = () => {
  return (
    <motion.div
      className="glass-card p-4 h-full flex flex-col items-center justify-center text-center relative overflow-hidden card-shine hover-lift"
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animated background rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-rose-500/20"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 shadow-lg mb-3 relative z-10"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        animate={{
          y: [0, -5, 0],
        }}
        style={{
          animation: "float 3s ease-in-out infinite",
        }}
      >
        <MapPin className="w-6 h-6 text-white" />
      </motion.div>
      <motion.p 
        className="text-xs text-muted-foreground relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Based in
      </motion.p>
      <motion.p 
        className="text-sm font-semibold text-foreground relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        India 🇮🇳
      </motion.p>
    </motion.div>
  );
};

export default MapCard;
