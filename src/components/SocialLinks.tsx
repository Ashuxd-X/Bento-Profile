import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

interface SocialLink {
  name: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    subtitle: "Check out my projects",
    href: "https://github.com/Ashuxd-X",
    icon: Github,
    gradient: "from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600",
  },
  {
    name: "LinkedIn",
    subtitle: "Let's connect",
    href: "https://linkedin.com/in/ashuxd",
    icon: Linkedin,
    gradient: "from-blue-500 to-blue-700",
  },
  {
    name: "Email",
    subtitle: "Drop me a message",
    href: "mailto:ashuxd.me@gmail.com",
    icon: Mail,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    name: "Resume",
    subtitle: "Download my CV",
    href: "/resume.pdf",
    icon: FileText,
    gradient: "from-emerald-500 to-teal-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
    },
  },
};

const SocialLinks = () => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map((link) => (
        <motion.div key={link.name} variants={itemVariants}>
          <SpotlightCard
            name={link.name}
            subtitle={link.subtitle}
            href={link.href}
            icon={link.icon}
            gradient={link.gradient}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
