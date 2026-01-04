import { motion } from "framer-motion";
import defaultProfileImg from "../assets/profile.jpg";

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  //avatarSeed?: string;
  imageSrc?: string;
  isOpenToWork?: boolean;
}

const ProfileCard = ({ 
  name, 
  title, 
  bio, 
  //avatarSeed = "felix", 
  imageSrc = defaultProfileImg,
  isOpenToWork = true 
}: ProfileCardProps) => {
  //const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&backgroundColor=c0aede`;

  return (
    <motion.div
      className="glass-card p-8 text-center relative overflow-hidden card-shine"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Avatar */}
      <motion.div
        className="relative inline-block mb-6"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.2 
        }}
        whileHover={{ scale: 1.08, rotate: 5 }}
      >
        <motion.div 
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary/20 dark:ring-primary/30 mx-auto relative"
          animate={{
            boxShadow: [
              "0 0 0 0 hsl(var(--primary) / 0)",
              "0 0 30px 10px hsl(var(--primary) / 0.2)",
              "0 0 0 0 hsl(var(--primary) / 0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img 
  src={imageSrc} 
  alt={`${name}'s avatar`}
  // Added 'image-render-pixel' custom class logic or standard Tailwind
  className="w-full h-full object-cover bg-secondary"
  style={{ 
    imageRendering: "auto", // Ensures browser smoothes the image
    // optional: for Chrome sometimes this specific hint helps reduce blur
    WebkitFontSmoothing: "antialiased", 
  }}
/>
        </motion.div>
        
        {/* Open to Work Badge */}
        {isOpenToWork && (
          <motion.div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="relative flex items-center gap-1 bg-status text-white text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 2px 10px hsl(142 76% 45% / 0.2)",
                  "0 2px 15px hsl(142 76% 45% / 0.4)",
                  "0 2px 10px hsl(142 76% 45% / 0.2)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <span className="status-pulse w-1.5 h-1.5 bg-white rounded-full" />
              Open to Work
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Name with gradient */}
      <motion.h1
        className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2 animate-gradient"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {name}
      </motion.h1>

      {/* Title with typewriter effect simulation */}
      <motion.p
        className="text-lg text-muted-foreground font-medium mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {title}
      </motion.p>

      {/* Bio */}
      <motion.p
        className="text-foreground/80 leading-relaxed max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {bio}
      </motion.p>
    </motion.div>
  );
};

export default ProfileCard;
