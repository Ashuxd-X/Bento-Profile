import { motion } from "framer-motion";

const technologies = [
  { name: "React", color: "bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30", glow: "sky" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30", glow: "blue" },
  { name: "Tailwind CSS", color: "bg-teal-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30", glow: "teal" },
  { name: "JavaScript", color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", glow: "yellow" },
  { name: "Node.js", color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30", glow: "green" },
  { name: "Python", color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", glow: "yellow" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  },
};

const TechStack = () => {
  return (
    <motion.div
      className="glass-card p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.h2 
        className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Tech Stack
      </motion.h2>
      
      <motion.div
        className="flex flex-wrap gap-2 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {technologies.map((tech, index) => (
          <motion.span
            key={tech.name}
            className={`px-3 py-1.5 text-sm font-medium rounded-full border backdrop-blur-sm ${tech.color} cursor-default relative overflow-hidden`}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.15,
              y: -5,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{
                translateX: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3 + index * 0.5,
                ease: "easeInOut",
              }}
            />
            <span className="relative z-10">{tech.name}</span>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TechStack;
