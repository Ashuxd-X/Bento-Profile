import { motion } from "framer-motion";
import MeshBackground from "@/components/MeshBackground";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileCard from "@/components/ProfileCard";
import TechStack from "@/components/TechStack";
import SocialLinks from "@/components/SocialLinks";
import CurrentFocus from "@/components/CurrentFocus";
import EducationCard from "@/components/EducationCard";
import PlaygroundCard from "@/components/PlaygroundCard";
import SpotifyWidget from "@/components/SpotifyWidget";
import MapCard from "@/components/MapCard";
import { Instagram } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <MeshBackground />
      
      {/* Film Grain Overlay */}
      <div className="bg-noise" />
      
      {/* Theme Toggle - Fixed Position with animation */}
      <motion.div 
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      >
        <ThemeToggle />
      </motion.div>

      {/* Floating particles decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-12 md:py-20">
        <motion.div 
          className="max-w-2xl mx-auto space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Section */}
          <motion.div variants={fadeInUp}>
            <ProfileCard
              name="Asish Kumar"
              title="Full-Stack Developer & UI Designer"
              bio="Building pixel-perfect web experiences with the MERN stack and Python. Focused on clean code, intuitive design, and continuous learning."
              //avatarSeed="Asish"
              isOpenToWork={true}
            />
          </motion.div>
          
          {/* Bento Grid Layout */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={fadeInUp}
          >
            {/* Tech Stack - Full Width */}
            <div className="sm:col-span-2">
              <TechStack />
            </div>
            
            {/* Education Card */}
            <EducationCard />
            
            {/* Small Cards Row */}
            <div className="grid grid-cols-2 gap-4">
              <SpotifyWidget />
              <MapCard />
            </div>
            
            {/* Playground - Full Width */}
            <div className="sm:col-span-2">
              <PlaygroundCard />
            </div>
          </motion.div>

          {/* Current Focus Widget */}
          <motion.div variants={fadeInUp}>
            <CurrentFocus />
          </motion.div>

          {/* Social Links Section */}
          <motion.div variants={fadeInUp}>
            <motion.h2 
              className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Connect With Me
            </motion.h2>
            <SocialLinks />
          </motion.div>

          {/* Footer */}
          <motion.footer
            className="text-center pt-8 pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.p 
              className="text-sm text-muted-foreground flex items-center justify-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              Made with <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block"
              >✨</motion.span> by 
              <a href="https://www.instagram.com/ashu.xdx" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-slate-900 dark:text-slate-200 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
              >
                <Instagram size={14} className="mt-0.5" />
                  Asish Kumar
              </a> • {new Date().getFullYear()}
            </motion.p>
          </motion.footer>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
