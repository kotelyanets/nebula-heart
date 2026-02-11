"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";

export default function ReasonsGrid() {
    return (
        <section className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 text-center">
                Reasons Why
            </h2>
            <p className="max-w-2xl text-lg md:text-xl text-white/60 text-center mb-12">
                Just a few of the infinite reasons why you mean the universe to me.
            </p>

            <div className="w-full max-w-6xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
                <BentoCard
                    eyebrow="01"
                    title="Your Smile"
                    description="It lights up my darkest days more than any star in the sky ever could."
                    graphic={
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
                    }
                    className="lg:col-span-3 lg:row-span-2 min-h-[500px]"
                />
                <BentoCard
                    eyebrow="02"
                    title="Our Adventures"
                    description="From simple drives to dream trips, every journey is better with you."
                    graphic={
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
                    }
                    className="lg:col-span-3 min-h-[240px]"
                />
                <BentoCard
                    eyebrow="03"
                    title="Your Support"
                    description="You believe in me even when I struggle to believe in myself."
                    graphic={
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                    }
                    className="lg:col-span-2 min-h-[240px]"
                />
                <BentoCard
                    eyebrow="04"
                    title="Your Laugh"
                    description="The most beautiful melody I've ever heard."
                    graphic={
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20" />
                    }
                    className="lg:col-span-1 min-h-[240px]"
                />
            </div>
        </section>
    );
}

export function BentoCard({
    className = "",
    eyebrow,
    title,
    description,
    graphic,
}: {
    className?: string;
    eyebrow: string;
    title: string;
    description: string;
    graphic?: React.ReactNode;
}) {
    return (
        <motion.div
            initial="idle"
            whileHover="active"
            variants={{ idle: { scale: 1 }, active: { scale: 1.02 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={clsx(
                className,
                "group relative flex flex-col overflow-hidden rounded-3xl",
                "bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl",
                "hover:bg-white/10 hover:border-white/20 transition-colors duration-300"
            )}
        >
            <div className="absolute inset-0 z-0">
                {graphic}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                <span className="text-white/40 text-sm font-mono tracking-widest uppercase mb-2">
                    {eyebrow}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    {title}
                </h3>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
