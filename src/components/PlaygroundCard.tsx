import { motion } from "framer-motion";
import { Blocks, ExternalLink, Sparkles } from "lucide-react";

interface Project {
  name: string;
  href: string;
}

const recentBuilds: Project[] = [
  { name: "JS Calculator", href: "#" },
  { name: "Weather App", href: "#" },
  { name: "Todo List", href: "#" },
  { name: "Portfolio v1", href: "#" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

const PlaygroundCard = () => {
  return (
    <motion.div
      className="glass-card p-5 h-full relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-600/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <motion.div 
          className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg relative"
          whileHover={{ rotate: 180, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Blocks className="w-5 h-5 text-white" />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </motion.div>
        </motion.div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Playground</h3>
          <p className="text-xs text-muted-foreground">Recent Builds</p>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-2 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recentBuilds.map((project, index) => (
          <motion.a
            key={project.name}
            href={project.href}
            className="group flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            
            <span className="text-sm font-medium text-foreground truncate relative z-10">
              {project.name}
            </span>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-2 relative z-10" />
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PlaygroundCard;
