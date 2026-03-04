import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Home,
    Briefcase,
    Code,
    User,
    Mail,
    FileText,
    Zap,
    Terminal,
    ArrowRight
} from "lucide-react";

interface CommandPaletteProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onAction: (action: string) => void;
}

const CommandPalette = ({ isOpen, setIsOpen, onAction }: CommandPaletteProps) => {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [isOpen, setIsOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[640px] pointer-events-auto"
                    >
                        <div className="mac-window overflow-hidden shadow-2xl border-none bg-card/80">
                            <Command className="flex flex-col h-full">
                                <div className="flex items-center px-4 py-4 gap-3 border-b border-white/5">
                                    <Search className="w-5 h-5 text-muted-foreground" />
                                    <Command.Input
                                        placeholder="Spotlight Search"
                                        className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/40 font-medium"
                                    />
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5">
                                        <span className="text-[10px] font-bold text-muted-foreground/60 tracking-widest">ESC</span>
                                    </div>
                                </div>

                                <Command.List className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                                    <Command.Empty className="py-10 text-center text-sm text-muted-foreground italic">
                                        No results found. Try something else?
                                    </Command.Empty>

                                    <Command.Group heading="Navigation" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                                        <Item onSelect={() => onAction("nav-home")} icon={Home} label="Go Home" shortcut="G H" />
                                        <Item onSelect={() => onAction("nav-work")} icon={Briefcase} label="View Experience" shortcut="G W" />
                                        <Item onSelect={() => onAction("nav-builds")} icon={Code} label="Browse Projects" shortcut="G B" />
                                        <Item onSelect={() => onAction("nav-profile")} icon={User} label="Connect Socially" shortcut="G P" />
                                    </Command.Group>

                                    <Command.Separator className="h-px bg-border/40 my-2" />

                                    <Command.Group heading="Actions" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                                        <Item onSelect={() => onAction("copy-email")} icon={Mail} label="Copy Email Address" shortcut="C E" />
                                        <Item onSelect={() => onAction("open-resume")} icon={FileText} label="View Resume" shortcut="↵" />
                                    </Command.Group>

                                    <Command.Separator className="h-px bg-border/40 my-2" />

                                    <Command.Group heading="Experimental" className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                                        <Item
                                            onSelect={() => onAction("toggle-hacker")}
                                            icon={Terminal}
                                            label="Infiltrate System (Hacker Mode)"
                                            shortcut="H A C K"
                                            variant="warning"
                                        />
                                    </Command.Group>
                                </Command.List>

                                <div className="flex items-center justify-between px-4 py-2 border-t border-border/40 bg-secondary/20">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                            <ArrowRight className="w-3 h-3 translate-y-[1px]" />
                                            <span>Navigate</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono opacity-50">v1.2 // PROTOCOL-COMMAND</span>
                                </div>
                            </Command>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Item = ({
    onSelect,
    icon: Icon,
    label,
    shortcut,
    variant = "default"
}: {
    onSelect: () => void;
    icon: any;
    label: string;
    shortcut?: string;
    variant?: "default" | "warning";
}) => (
    <Command.Item
        onSelect={onSelect}
        className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-default select-none aria-selected:bg-primary/10 transition-all duration-200 group ${variant === "warning" ? "aria-selected:bg-emerald-500/10" : ""
            }`}
    >
        <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg border border-border/40 bg-secondary/50 group-aria-selected:border-primary/30 group-aria-selected:bg-primary/5 transition-colors ${variant === "warning" ? "group-aria-selected:border-emerald-500/30 group-aria-selected:bg-emerald-500/5" : ""
                }`}>
                <Icon className={`w-3.5 h-3.5 text-muted-foreground group-aria-selected:text-primary transition-colors ${variant === "warning" ? "group-aria-selected:text-emerald-500" : ""
                    }`} />
            </div>
            <span className="text-sm font-medium text-foreground/80 group-aria-selected:text-foreground">
                {label}
            </span>
        </div>
        {shortcut && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/40 bg-secondary/30">
                <span className="text-[9px] font-mono font-bold text-muted-foreground/60 tracking-wider whitespace-nowrap">
                    {shortcut}
                </span>
            </div>
        )}
    </Command.Item>
);

export default CommandPalette;
