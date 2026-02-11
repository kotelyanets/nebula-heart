"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroOverlay() {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-24 md:pt-32 pointer-events-none select-none">
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="text-center"
            >
                <h1 className="text-5xl md:text-9xl font-serif text-white tracking-wide mb-4 drop-shadow-2xl">
                    For You
                </h1>
                <p className="text-lg md:text-2xl font-light text-white/80 tracking:[0.2em] uppercase">
                    My Universe.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    delay: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute bottom-10"
            >
                <ChevronDown className="w-8 h-8 text-white/50" />
            </motion.div>
        </div>
    );
}
