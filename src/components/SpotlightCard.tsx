import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SpotlightCardProps {
  name: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  gradient: string;
}

const SpotlightCard = ({ name, subtitle, href, icon: Icon, gradient }: SpotlightCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="premium-card group relative flex items-center gap-4 p-5 cursor-pointer overflow-hidden transition-all duration-500"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Dynamic Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.08), transparent 60%)`
        }}
      />

      {/* Icon System */}
      <div className="relative z-10 feature-icon-wrapper w-10 h-10 group-hover:bg-primary/5 transition-colors duration-500">
        <Icon className={`w-4 h-4 text-foreground group-hover:text-primary transition-colors duration-500`} />
      </div>

      {/* Text Module */}
      <div className="relative z-10 flex-1 min-w-0 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <ArrowUpRight className="w-2.5 h-2.5 text-muted-foreground/30 group-hover:text-primary/50 transition-all duration-300 translate-y-0.5" />
        </div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] opacity-60 mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Hardware-style Status indicator (optional, just for aesthetic) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-10">
        <div className="w-1 h-3 bg-foreground rounded-full" />
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </div>
    </motion.a>
  );
};

export default SpotlightCard;
