import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const EducationCard = () => {
  return (
    <motion.div
      className="glass-card p-5 h-full relative overflow-hidden card-shine hover-lift"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="flex items-start gap-4 relative z-10">
        <motion.div 
          className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg"
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          animate={{
            boxShadow: [
              "0 10px 20px rgba(245, 158, 11, 0.3)",
              "0 15px 30px rgba(245, 158, 11, 0.4)",
              "0 10px 20px rgba(245, 158, 11, 0.3)",
            ],
          }}
        >
          <GraduationCap className="w-6 h-6 text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <motion.h3 
            className="font-display font-semibold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            B.Tech : Electronics and Communication Engineering
          </motion.h3>
          <motion.p 
            className="text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="https://nist.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors duration-300 underline-offset-4 hover:underline">
            NIST University, Odisha
            </a>
          </motion.p>
          <motion.div 
            className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>2021-2025</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;
