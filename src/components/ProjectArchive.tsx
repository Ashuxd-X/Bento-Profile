import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ExternalLink,
    Github,
    Layers,
    Cpu,
    Globe,
    CheckCircle2,
    ArrowRight,
    Maximize2
} from "lucide-react";
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

interface ProjectArchiveProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectArchive = ({ project, onClose }: ProjectArchiveProps) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-background/90 backdrop-blur-md pointer-events-auto"
                    onClick={onClose}
                />

                <motion.div
                    layoutId={`project-card-${project.name}`}
                    className="relative w-full max-w-5xl max-h-[85vh] mac-window overflow-hidden border-none pointer-events-auto flex flex-col md:flex-row shadow-2xl"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* macOS Traffic Lights */}
                    <div className="traffic-lights">
                        <div className="traffic-light bg-red-500/80 cursor-pointer" onClick={onClose} />
                        <div className="traffic-light bg-yellow-500/80" />
                        <div className="traffic-light bg-green-500/80" />
                    </div>

                    {/* Left Side: Visual/Cover */}
                    <div className={`w-full md:w-5/12 relative bg-gradient-to-br ${project.accentColor} p-12 flex flex-col justify-end min-h-[400px] md:min-h-full`}>
                        <div className="absolute top-16 left-12">
                            <div className="feature-icon-wrapper w-20 h-20 bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl">
                                <project.icon className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <motion.h2
                                layoutId={`project-title-${project.name}`}
                                className="text-5xl font-extrabold text-white tracking-tighter leading-none"
                            >
                                {project.name}
                            </motion.h2>
                            <div className="flex flex-wrap gap-2.5">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-white uppercase tracking-[0.2em] backdrop-blur-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Grid */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:w-7/12 p-12 md:p-16 overflow-y-auto custom-scrollbar flex flex-col bg-card/50">
                        <div className="space-y-12 flex-1">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
                                    <Layers className="w-3.5 h-3.5" />
                                    Archive // Overview
                                </div>
                                <p className="text-foreground/80 leading-relaxed text-xl font-medium tracking-tight">
                                    {project.longDescription || project.description}
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
                                    <Cpu className="w-4 h-4" />
                                    System Hardware
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {(project.techStack || ["React", "TypeScript", "Tailwind"]).map(tech => (
                                        <div key={tech} className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 hover:border-foreground/10 transition-colors text-foreground/70">
                                            <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/40" />
                                            <span className="text-sm font-bold">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500/80 uppercase tracking-[0.4em]">
                                    <Globe className="w-4 h-4" />
                                    Key Deliverables
                                </div>
                                <div className="space-y-4">
                                    {(project.features || [
                                        "High-performance architecture",
                                        "End-to-end type safety",
                                        "Responsive design systems"
                                    ]).map(feature => (
                                        <div key={feature} className="flex items-center gap-4 text-base text-muted-foreground group">
                                            <div className="p-1 rounded bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <span className="font-semibold text-foreground/60">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="mt-16 flex gap-4 pt-10 border-t border-white/5">
                            <motion.a
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl bg-foreground text-background font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-foreground/90 transition-all"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Execute Environment
                            </motion.a>
                            <motion.a
                                href="https://github.com/Ashuxd-X"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 flex items-center justify-center rounded-2xl bg-foreground/5 border border-white/5 hover:bg-foreground/10 transition-all shadow-sm"
                            >
                                <Github className="w-6 h-6 text-foreground/60" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectArchive;
