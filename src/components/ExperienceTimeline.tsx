import { motion, type Variants } from "framer-motion";
import { Briefcase } from "lucide-react";

interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
    gradient: string;
}

const experiences: Experience[] = [
    {
        role: "Full-Stack Developer",
        company: "Freelance",
        period: "2024 — Present",
        description: "Building scalable web apps with MERN stack, designing UI systems, and shipping production-grade products for clients.",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        role: "Crypto Automation Tools Builder",
        company: "Independent",
        period: "2023 — 2024",
        description: "Developed automated trading bots, airdrop farming scripts, and DeFi tooling for the crypto ecosystem.",
        gradient: "from-amber-500 to-orange-600",
    },
    {
        role: "Airdrop Community Manager",
        company: "Web3 Projects",
        period: "2023 — 2024",
        description: "Managed and grew airdrop communities, coordinated campaigns, and optimized engagement strategies across Discord and Telegram.",
        gradient: "from-sky-500 to-blue-600",
    },
    {
        role: "Business Development Manager",
        company: "MEXC & Bybit",
        period: "2022 — 2023",
        description: "Drove partnerships, onboarded projects, and managed exchange listings for MEXC and Bybit exchanges.",
        gradient: "from-emerald-500 to-teal-600",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 150,
            damping: 15,
        },
    },
};

const ExperienceTimeline = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                        <Briefcase className="w-3 h-3" />
                        Professional Log
                    </h2>
                    <div className="h-px flex-1 bg-border/40 ml-4 max-w-[40px]" />
                </div>

                <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="group relative flex gap-6 items-start"
                            variants={itemVariants}
                        >
                            {/* Vertical Connector System */}
                            <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
                                <div className={`feature-icon-wrapper w-10 h-10 group-hover:bg-primary/5 transition-colors duration-500`}>
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${exp.gradient}`} />
                                </div>
                                {index < experiences.length - 1 && (
                                    <div className="w-px h-full min-h-[40px] bg-gradient-to-b from-border/60 via-border/20 to-transparent mt-2" />
                                )}
                            </div>

                            {/* Content Block */}
                            <div className="flex-1 pt-1 pb-4">
                                <div className="flex flex-col gap-1.5 mb-2">
                                    <h3 className="text-sm font-bold text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-bold text-primary/80 tracking-wide">{exp.company}</span>
                                        <span className="text-muted-foreground/30 text-[10px]">•</span>
                                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{exp.period}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-lg font-medium">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ExperienceTimeline;
