import { motion, type Variants } from "framer-motion";
import {
  Atom,
  Wind,
  Code2,
  Cpu,
  Terminal,
  Database,
  Layers,
  FileCode
} from "lucide-react";

const technologies = [
  { name: "React", icon: Atom, color: "text-sky-500" },
  { name: "TypeScript", icon: FileCode, color: "text-blue-500" },
  { name: "Tailwind", icon: Wind, color: "text-teal-500" },
  { name: "JavaScript", icon: Code2, color: "text-yellow-500" },
  { name: "Node.js", icon: Cpu, color: "text-green-500" },
  { name: "Python", icon: Terminal, color: "text-orange-500" },
  { name: "MongoDB", icon: Database, color: "text-emerald-500" },
  { name: "Next.js", icon: Layers, color: "text-slate-400" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const TechStack = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em]">
          Instrumental Stack
        </h2>
        <div className="h-px flex-1 bg-border/40 ml-4 max-w-[40px]" />
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {technologies.map((tech) => (
          <motion.div
            key={tech.name}
            className="group relative"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="feature-icon-wrapper w-full aspect-square max-w-[64px] group-hover:bg-primary/5 transition-colors duration-500 relative">
                <tech.icon className={`w-6 h-6 ${tech.color} opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-primary/20 blur-xl transition-opacity duration-700 pointer-events-none" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground">
                {tech.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
