import { motion, type Variants } from "framer-motion";
import { Blocks, ExternalLink, Github, ShoppingCart, Cpu, Cloud, ListChecks, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Project {
  name: string;
  description: string;
  href: string;
  tags: string[];
  icon: LucideIcon;
  accentColor: string;
  longDescription?: string;
  features?: string[];
  techStack?: string[];
}

export const recentBuilds: Project[] = [
  {
    name: "CartOfArts.in",
    description: "Full-featured ecommerce platform with payments, cart, and admin dashboard",
    href: "https://cartofarts.in",
    tags: ["E-Commerce", "Full-Stack"],
    icon: ShoppingCart,
    accentColor: "from-rose-500 to-pink-600",
    longDescription: "CartOfArts is a comprehensive e-commerce ecosystem designed for creative professionals. It features a custom-built cart system, secure payment gateway integration, and a robust administrative dashboard for real-time inventory and order management.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Razorpay API"],
    features: ["Dynamic Inventory Management", "Real-time Order Tracking", "Secure Checkout Flow", "Admin Analytics Dashboard"]
  },
  {
    name: "Bento Profile",
    description: "Interactive developer profile with bento grid layout",
    href: "https://github.com/Ashuxd-X/Bento-Profile",
    tags: ["React", "Tailwind"],
    icon: Cpu,
    accentColor: "from-violet-500 to-purple-600",
    longDescription: "A premium, high-fidelity developer portfolio inspired by Apple and Linear aesthetics. This project focuses on atomic design principles, sophisticated animations, and a hardware-integrated look and feel.",
    techStack: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    features: ["Custom Design System", "Liquid-smooth Animations", "Responsive Bento Grid", "Advanced Interaction Hooks"]
  },
  {
    name: "Weather App",
    description: "Real-time weather dashboard with city search & forecasts",
    href: "https://github.com/Ashuxd-X",
    tags: ["JavaScript", "API"],
    icon: Cloud,
    accentColor: "from-sky-500 to-blue-600",
    longDescription: "A high-performance weather telemetry dashboard providing real-time atmospheric data. It leverages external APIs to deliver accurate forecasts with a clean, hardware-inspired visualization layer.",
    techStack: ["React", "OpenWeather API", "Chart.js", "Glassmorphism"],
    features: ["Global City Search", "Hourly/Daily Forecasts", "Real-time UV & Humidity", "Dynamic Backgrounds"]
  },
  {
    name: "Task Manager",
    description: "Full-stack task manager with auth & team collaboration",
    href: "https://github.com/Ashuxd-X",
    tags: ["MERN", "Auth"],
    icon: ListChecks,
    accentColor: "from-emerald-500 to-teal-600",
    longDescription: "A professional-grade productivity application designed for distributed teams. Features include real-time task synchronization, role-based access control, and collaborative workspaces.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    features: ["Real-time Sync", "Team Workspaces", "Kanban Board View", "Activity Log Telemetry"]
  },
];

const containerVariants: Variants = {
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

interface PlaygroundCardProps {
  onProjectClick: (project: Project) => void;
}

const PlaygroundCard = ({ onProjectClick }: PlaygroundCardProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
          <Blocks className="w-3 h-3" />
          Build Inventory
        </h2>
        <div className="h-px flex-1 bg-border/40 ml-4 max-w-[40px]" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {recentBuilds.map((project) => {
          const Icon = project.icon;
          return (
            <motion.button
              key={project.name}
              onClick={() => onProjectClick(project)}
              className="group p-5 rounded-2xl bg-secondary/30 hover:bg-secondary/60 border border-border/40 hover:border-primary/20 transition-all duration-500 relative overflow-hidden text-left"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              layoutId={`project-card-${project.name}`}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="feature-icon-wrapper w-10 h-10 group-hover:bg-primary/5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="p-1.5 rounded-lg bg-background/80 border border-border/40 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <motion.h3
                  layoutId={`project-title-${project.name}`}
                  className="text-sm font-bold text-foreground group-hover:text-gradient-premium transition-colors"
                >
                  {project.name}
                </motion.h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 font-medium">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5 relative z-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-background/50 border border-border/20 text-muted-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.a
        href="https://github.com/Ashuxd-X"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 p-3 rounded-xl bg-secondary/20 border border-border/40 hover:border-primary/20 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-500"
        whileHover={{ y: -2 }}
      >
        <Github className="w-3.5 h-3.5" />
        View Complete Archive
      </motion.a>
    </div>
  );
};

export default PlaygroundCard;
