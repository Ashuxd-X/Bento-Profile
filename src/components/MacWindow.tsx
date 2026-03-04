import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface MacWindowProps {
    children: ReactNode;
    title?: string;
    className?: string;
    delay?: number;
    id?: string;
    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
}

const MacWindow = ({
    children,
    title,
    className = "",
    delay = 0,
    id,
    onClose,
    onMinimize,
    onMaximize
}: MacWindowProps) => {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={`mac-window relative group ${className}`}
        >
            <div className="traffic-lights">
                <button
                    onClick={onClose}
                    className="traffic-light bg-red-500/80 group-hover:after:content-['×'] after:text-[8px] after:text-red-900/50 after:font-bold"
                />
                <button
                    onClick={onMinimize}
                    className="traffic-light bg-yellow-500/80 group-hover:after:content-['-'] after:text-[10px] after:text-yellow-900/50 after:font-bold"
                />
                <button
                    onClick={onMaximize}
                    className="traffic-light bg-green-500/80 group-hover:after:content-['+'] after:text-[8px] after:text-green-900/50 after:font-bold"
                />
            </div>

            {title && (
                <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center border-b border-border/20 pointer-events-none">
                    <span className="text-[11px] font-bold text-muted-foreground/60 tracking-tight uppercase">
                        {title}
                    </span>
                </div>
            )}

            <div className="pt-10 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default MacWindow;
