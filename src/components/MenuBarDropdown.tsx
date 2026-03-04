import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
    label?: string;
    onClick?: () => void;
    shortcut?: string;
    isSeparator?: boolean;
}

interface MenuBarDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    items: DropdownItem[];
    triggerRect: DOMRect | null;
}

const MenuBarDropdown = ({ isOpen, onClose, items, triggerRect }: MenuBarDropdownProps) => {
    if (!triggerRect) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for closing */}
                    <div
                        className="fixed inset-0 z-[190]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="fixed z-[200] min-w-[200px] py-1 mt-1 bg-background/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                        style={{
                            top: triggerRect.bottom,
                            left: triggerRect.left
                        }}
                    >
                        {items.map((item, index) => (
                            item.isSeparator ? (
                                <div key={index} className="h-px bg-white/10 my-1 mx-1" />
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => {
                                        item.onClick?.();
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-1 text-[12px] font-medium text-foreground/90 hover:bg-primary hover:text-primary-foreground transition-colors group"
                                >
                                    <span>{item.label}</span>
                                    {item.shortcut && (
                                        <span className="opacity-40 text-[10px] group-hover:opacity-100">{item.shortcut}</span>
                                    )}
                                </button>
                            )
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MenuBarDropdown;
