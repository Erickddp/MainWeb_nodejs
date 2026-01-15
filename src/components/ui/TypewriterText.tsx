"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
    content: string;
    speed?: number; // ms per char
    className?: string;
    onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    content,
    speed = 25,
    className = "",
    onComplete
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const indexRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Reset when content changes
    useEffect(() => {
        setDisplayedText("");
        indexRef.current = 0;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const animate = () => {
            // If we've shown the full string
            if (indexRef.current >= content.length) {
                if (onComplete) onComplete();
                return;
            }

            // Add next char
            const nextChar = content.charAt(indexRef.current);
            setDisplayedText((prev) => prev + nextChar);
            indexRef.current++;

            // Schedule next char (randomize slightly for realism)
            const variance = Math.random() * 10;
            timeoutRef.current = setTimeout(animate, speed + variance);
        };

        // Start animation
        timeoutRef.current = setTimeout(animate, 100);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [content, speed, onComplete]);

    return (
        <div className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-5 ml-1 align-middle bg-accent"
            />
        </div>
    );
};
