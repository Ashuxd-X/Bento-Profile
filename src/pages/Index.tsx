import { motion, type Variants, AnimatePresence } from "framer-motion";
import MeshBackground from "@/components/MeshBackground";
import ProfileCard from "@/components/ProfileCard";
import TechStack from "@/components/TechStack";
import SocialLinks from "@/components/SocialLinks";
import CurrentFocus from "@/components/CurrentFocus";
import EducationCard from "@/components/EducationCard";
import PlaygroundCard from "@/components/PlaygroundCard";
import SpotifyWidget from "@/components/SpotifyWidget";
import MapCard from "@/components/MapCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { useState, useEffect, useCallback } from "react";
import CommandPalette from "@/components/CommandPalette";
import ProjectArchive from "@/components/ProjectArchive";
import MacWindow from "@/components/MacWindow";
import MenuBarDropdown from "@/components/MenuBarDropdown";
import { toast } from "sonner";
import {
  Wifi,
  Battery,
  Search,
  Calendar,
  Clock,
  Maximize2,
  Banana,
  Home,
  Briefcase,
  Rocket,
  MessageCircle,
  ArrowUpRight,
  Mail
} from "lucide-react";

interface Project {
  name: string;
  description: string;
  href: string;
  tags: string[];
  icon: any;
  accentColor: string;
  longDescription?: string;
  features?: string[];
  techStack?: string[];
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [windowStates, setWindowStates] = useState<Record<string, { isOpen: boolean; isMinimized: boolean }>>({
    home: { isOpen: true, isMinimized: false },
    work: { isOpen: true, isMinimized: false },
    builds: { isOpen: true, isMinimized: false },
    profile: { isOpen: true, isMinimized: false },
    connect: { isOpen: true, isMinimized: false },
    tech: { isOpen: true, isMinimized: false },
    about: { isOpen: false, isMinimized: false },
  });

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const handleMenuClick = (e: React.MouseEvent, menu: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setTriggerRect(rect);
      setActiveMenu(menu);
    }
  };

  const toggleWindow = (id: string, action: 'close' | 'minimize' | 'maximize' | 'open') => {
    setWindowStates(prev => {
      const newState = { ...prev };
      if (!newState[id]) newState[id] = { isOpen: true, isMinimized: false };

      switch (action) {
        case 'close':
          newState[id] = { ...newState[id], isOpen: false };
          toast.info(`Window closed`, { description: `You can reopen it from the dock.` });
          break;
        case 'minimize':
          newState[id] = { ...newState[id], isMinimized: true };
          toast.info(`Window minimized`);
          break;
        case 'maximize':
          toast.success(`Window maximized`);
          break;
        case 'open':
          newState[id] = { isOpen: true, isMinimized: false };
          break;
      }
      return newState;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(height > 0 ? scrolled : 0);
    };
    window.addEventListener("scroll", handleScroll);

    // Scroll Spy Logic
    const sections = ["home", "work", "builds", "profile"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isHackerMode) {
      document.documentElement.classList.add("hacker-mode");
      toast.success("SYSTEM INFILTRATED", {
        description: "Protocol override active. Welcome to the back-end.",
        icon: <Rocket className="w-4 h-4" />,
      });
    } else {
      document.documentElement.classList.remove("hacker-mode");
    }
  }, [isHackerMode]);

  const onCommandAction = useCallback((action: string) => {
    setIsCommandPaletteOpen(false);

    switch (action) {
      case "nav-home":
        toggleWindow("home", "open");
        scrollTo("home");
        break;
      case "nav-work":
        toggleWindow("work", "open");
        scrollTo("work");
        break;
      case "nav-builds":
        toggleWindow("builds", "open");
        scrollTo("builds");
        break;
      case "nav-profile":
        toggleWindow("profile", "open");
        scrollTo("profile");
        break;
      case "copy-email":
        navigator.clipboard.writeText("asish@example.com"); // Replace with actual
        toast.success("Email Copied", { description: "Ready to paste!" });
        break;
      case "open-resume":
        window.open("/resume.pdf", "_blank");
        break;
      case "open-about":
        toggleWindow("about", "open");
        break;
      case "toggle-hacker":
    }
  }, [isHackerMode]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden pb-16 md:pb-0">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary/40 z-[100] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      {/* macOS Menu Bar */}
      <div className="mac-menu-bar">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded-md transition-colors group"
            onClick={(e) => handleMenuClick(e, "apple")}
          >
            <Banana className="w-3.5 h-3.5 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold uppercase tracking-tighter">Ashu XD</span>
          </div>

          <span
            className={`opacity-60 cursor-default hover:opacity-100 hidden sm:inline px-2 py-0.5 rounded-md transition-all ${activeMenu === 'File' ? 'bg-white/10 opacity-100' : ''}`}
            onClick={(e) => handleMenuClick(e, 'File')}
          >
            File
          </span>
          <span
            className={`opacity-60 cursor-default hover:opacity-100 hidden sm:inline px-2 py-0.5 rounded-md transition-all ${activeMenu === 'Edit' ? 'bg-white/10 opacity-100' : ''}`}
            onClick={(e) => handleMenuClick(e, 'Edit')}
          >
            Edit
          </span>
          <span
            className={`opacity-60 cursor-default hover:opacity-100 hidden sm:inline px-2 py-0.5 rounded-md transition-all ${activeMenu === 'View' ? 'bg-white/10 opacity-100' : ''}`}
            onClick={(e) => handleMenuClick(e, 'View')}
          >
            View
          </span>
          <span
            className={`opacity-60 cursor-default hover:opacity-100 hidden sm:inline px-2 py-0.5 rounded-md transition-all ${activeMenu === 'Go' ? 'bg-white/10 opacity-100' : ''}`}
            onClick={(e) => handleMenuClick(e, 'Go')}
          >
            Go
          </span>
          <span
            className={`opacity-60 cursor-default hover:opacity-100 hidden sm:inline px-2 py-0.5 rounded-md transition-all ${activeMenu === 'Window' ? 'bg-white/10 opacity-100' : ''}`}
            onClick={(e) => handleMenuClick(e, 'Window')}
          >
            Window
          </span>
          <span
            className={`opacity-60 cursor-default hover:opacity-100 hidden sm:inline px-2 py-0.5 rounded-md transition-all ${activeMenu === 'Help' ? 'bg-white/10 opacity-100' : ''}`}
            onClick={(e) => handleMenuClick(e, 'Help')}
          >
            Help
          </span>
        </div>

        <MenuBarDropdown
          isOpen={activeMenu !== null}
          onClose={() => setActiveMenu(null)}
          triggerRect={triggerRect}
          items={
            activeMenu === 'apple' ? [
              { label: 'About This Mac', onClick: () => toggleWindow("about", "open") },
              { isSeparator: true },
              { label: 'System Settings...', shortcut: '⌘,' },
              { label: 'App Store...', shortcut: '4 updates' },
              { isSeparator: true },
              { label: 'Recent Items' },
              { isSeparator: true },
              { label: 'Force Quit...', shortcut: '⌥⌘⎋' },
              { isSeparator: true },
              { label: 'Sleep' },
              { label: 'Restart...' },
              { label: 'Shut Down...' },
              { isSeparator: true },
              { label: 'Lock Screen', shortcut: '⌃⌘Q' },
              { label: 'Log Out Ashu...', shortcut: '⇧⌘Q' }
            ] : activeMenu === 'File' ? [
              { label: 'New Window', shortcut: '⌘N' },
              { label: 'New Tab', shortcut: '⌘T' },
              { label: 'Open...', shortcut: '⌘O', onClick: () => setIsCommandPaletteOpen(true) },
              { isSeparator: true },
              { label: 'Close Window', shortcut: '⌘W', onClick: () => toggleWindow("home", "close") }
            ] : activeMenu === 'Edit' ? [
              { label: 'Undo', shortcut: '⌘Z' },
              { label: 'Redo', shortcut: '⇧⌘Z' },
              { isSeparator: true },
              { label: 'Cut', shortcut: '⌘X' },
              { label: 'Copy', shortcut: '⌘C' },
              { label: 'Paste', shortcut: '⌘V' },
              { isSeparator: true },
              { label: 'Select All', shortcut: '⌘A' }
            ] : activeMenu === 'View' ? [
              { label: 'Enter Full Screen', shortcut: 'fn F' },
              { label: 'Reload Page', shortcut: '⌘R', onClick: () => window.location.reload() },
              { isSeparator: true },
              { label: 'Hacker Mode', onClick: () => setIsHackerMode(!isHackerMode) }
            ] : [
              { label: 'Coming Soon...' }
            ]
          }
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 opacity-60">
            <Wifi className="w-3 h-3" />
            <Battery className="w-3 h-3" />
            <Search
              className="w-3 h-3 cursor-pointer hover:opacity-100"
              onClick={() => setIsCommandPaletteOpen(true)}
            />
          </div>
          <div className="h-4 w-px bg-foreground/10 mx-1" />
          <div className="flex items-center gap-2">
            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <span>{currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
          </div>
        </div>
      </div>

      <MeshBackground />

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-noise z-[1]" />

      {/* Floating particles — desktop only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden md:block">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/10"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Main Content — Dashboard Layout */}
      <main className="relative z-10 px-4 sm:px-6 py-24 pb-32 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Dashboard Module: Hero */}
          {windowStates.home.isOpen && !windowStates.home.isMinimized && (
            <MacWindow
              id="home"
              title="System / Profile"
              onClose={() => toggleWindow("home", "close")}
              onMinimize={() => toggleWindow("home", "minimize")}
              onMaximize={() => toggleWindow("home", "maximize")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
                <div className="md:col-span-2">
                  <ProfileCard
                    name="Asish Kumar"
                    title="Full-Stack Developer | Crypto Tools Builder"
                    bio="Building automated trading bots, airdrop tools, and scalable web apps. Previously BD Manager at MEXC & Bybit."
                    isOpenToWork={true}
                  />
                </div>
                <div className="hidden md:block">
                  <MapCard />
                </div>
              </div>
            </MacWindow>
          )}

          {/* Dashboard Module: CTA */}
          {windowStates.connect.isOpen && !windowStates.connect.isMinimized && (
            <MacWindow
              title="Action / Connect"
              onClose={() => toggleWindow("connect", "close")}
              onMinimize={() => toggleWindow("connect", "minimize")}
              onMaximize={() => toggleWindow("connect", "maximize")}
            >
              <div className="block p-8 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="feature-icon-wrapper w-14 h-14 bg-primary/10 border-primary/20">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight uppercase">Let's Work Together</h3>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-60">Currently available for high-impact projects</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.a
                      href="mailto:ashuxd.me@gmail.com"
                      className="px-6 py-2.5 bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-foreground/90 transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Me
                    </motion.a>
                  </div>
                </div>
              </div>
            </MacWindow>
          )}

          {/* ══════ Tech Stack ══════ */}
          {windowStates.tech.isOpen && !windowStates.tech.isMinimized && (
            <MacWindow
              title="Development / Tech Stack"
              onClose={() => toggleWindow("tech", "close")}
              onMinimize={() => toggleWindow("tech", "minimize")}
              onMaximize={() => toggleWindow("tech", "maximize")}
            >
              <div className="p-6 md:p-8">
                <TechStack />
              </div>
            </MacWindow>
          )}

          {/* ══════ Current Focus ══════ */}
          <motion.div variants={fadeInUp}>
            <CurrentFocus />
          </motion.div>

          {/* ══════ Bento Grid: Education + Spotify ══════ */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-5"
            variants={fadeInUp}
          >
            <div className="sm:col-span-3">
              <EducationCard />
            </div>
            <div className="sm:col-span-2">
              <SpotifyWidget />
            </div>
          </motion.div>

          {/* Dashboard Module: Experience */}
          {windowStates.work.isOpen && !windowStates.work.isMinimized && (
            <MacWindow
              id="work"
              title="Archive / Experience"
              onClose={() => toggleWindow("work", "close")}
              onMinimize={() => toggleWindow("work", "minimize")}
              onMaximize={() => toggleWindow("work", "maximize")}
            >
              <div className="p-6 md:p-8">
                <ExperienceTimeline />
              </div>
            </MacWindow>
          )}

          {/* Dashboard Module: Projects */}
          {windowStates.builds.isOpen && !windowStates.builds.isMinimized && (
            <MacWindow
              id="builds"
              title="Archive / Projects"
              onClose={() => toggleWindow("builds", "close")}
              onMinimize={() => toggleWindow("builds", "minimize")}
              onMaximize={() => toggleWindow("builds", "maximize")}
            >
              <div className="p-6 md:p-8">
                <PlaygroundCard onProjectClick={setSelectedProject} />
              </div>
            </MacWindow>
          )}

          {/* ══════ Map (mobile only) ══════ */}
          <motion.div className="md:hidden" variants={fadeInUp}>
            <MapCard />
          </motion.div>

          {/* ══════ Social Links & Footer Section ══════ */}
          {windowStates.profile.isOpen && !windowStates.profile.isMinimized && (
            <MacWindow
              id="profile"
              title="System / Connectivity"
              onClose={() => toggleWindow("profile", "close")}
              onMinimize={() => toggleWindow("profile", "minimize")}
              onMaximize={() => toggleWindow("profile", "maximize")}
            >
              <div className="p-6 md:p-8">
                <SocialLinks />
              </div>
            </MacWindow>
          )}

          {/* About Window Overlay */}
          <AnimatePresence>
            {windowStates.about.isOpen && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-sm"
                >
                  <MacWindow
                    title="About Ashu XD"
                    onClose={() => toggleWindow("about", "close")}
                    onMinimize={() => toggleWindow("about", "close")}
                    onMaximize={() => toggleWindow("about", "maximize")}
                  >
                    <div className="p-8 text-center space-y-6">
                      <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
                        <Banana className="w-16 h-16 text-yellow-400 relative z-10 mx-auto" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Ashu XD</h2>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-1">Version 2024.3.0 (Beta)</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-border/20 text-left">
                        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Processor</span>
                          <span className="text-foreground">Human Brain i9</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Memory</span>
                          <span className="text-foreground">64GB Coffee-RAM</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Graphics</span>
                          <span className="text-foreground">Imagination 4090 TI</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleWindow("about", "close")}
                        className="w-full py-2 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-foreground/80 transition-colors"
                      >
                        System Report...
                      </button>
                    </div>
                  </MacWindow>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* ══════ Footer ══════ */}
          <motion.footer
            className="text-center pt-6 pb-2"
            variants={fadeInUp}
          >
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 flex-wrap">
              Built with <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >❤️</motion.span> by
              <a href="https://instagram.com/ashu.xdx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                AshuXD ↗
              </a>
            </p>
          </motion.footer>
        </motion.div>
      </main>
      {/* macOS Dock */}
      <div className="mac-dock">
        {[
          { id: "home", icon: Home, label: "Finder" },
          { id: "work", icon: Briefcase, label: "Job History" },
          { id: "builds", icon: Rocket, label: "Projects" },
          { id: "profile", icon: MessageCircle, label: "Messages" }
        ].map((item) => (
          <motion.button
            key={item.id}
            onClick={() => {
              toggleWindow(item.id, "open");
              scrollTo(item.id);
            }}
            className="mac-dock-item group"
            whileHover={{ scale: 1.4, y: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md mac-glass opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-[10px] font-bold">
              {item.label}
            </div>
            <div className={`p-2 rounded-[13px] transition-all duration-300 ${activeSection === item.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
              }`}>
              <item.icon className="w-5 h-5" />
            </div>
            {activeSection === item.id && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground" />
            )}
          </motion.button>
        ))}

        <div className="h-8 w-px bg-foreground/10 mx-1" />

        <motion.button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="mac-dock-item group bg-foreground/5 text-foreground/60 hover:bg-foreground/10 rounded-2xl"
          whileHover={{ scale: 1.4, y: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md mac-glass opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-[10px] font-bold">
            Spotlight
          </div>
          <Search className="w-5 h-5" />
        </motion.button>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
        onAction={onCommandAction}
      />

      <ProjectArchive
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};


export default Index;
