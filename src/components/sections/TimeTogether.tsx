"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

const WORDS = ["Time", "Together", "Every", "Second", "Counts"];

export default function TimeTogether() {
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Placeholder start date: Valentine's Day 2024
    // TODO: Let user customize this via props or manual edit
    const startDate = new Date("2025-05-13T14:20:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            const yearInMs = 1000 * 60 * 60 * 24 * 365.25;
            const dayInMs = 1000 * 60 * 60 * 24;
            const hourInMs = 1000 * 60 * 60;
            const minuteInMs = 1000 * 60;
            const secondInMs = 1000;

            const years = Math.floor(difference / yearInMs);
            const remainingAfterYears = difference % yearInMs;

            const days = Math.floor(remainingAfterYears / dayInMs);
            const remainingAfterDays = remainingAfterYears % dayInMs;

            const hours = Math.floor(remainingAfterDays / hourInMs);
            const remainingAfterHours = remainingAfterDays % hourInMs;

            const minutes = Math.floor(remainingAfterHours / minuteInMs);
            const remainingAfterMinutes = remainingAfterHours % minuteInMs;

            const seconds = Math.floor(remainingAfterMinutes / secondInMs);

            setTimeElapsed({ years, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-screen pt-0 pb-20 px-4 flex flex-col items-center justify-start bg-transparent">
            {/* Particle Header - Positioned to be visible immediately on scroll */}
            <div className="w-full max-w-4xl h-40 mt-32 mb-20">
                <ParticleTextEffect words={WORDS} />
            </div>

            {/* Timer Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-8 max-w-5xl mx-auto z-10">
                <TimeUnit value={timeElapsed.years} label="Years" />
                <TimeUnit value={timeElapsed.days} label="Days" />
                <TimeUnit value={timeElapsed.hours} label="Hours" />
                <TimeUnit value={timeElapsed.minutes} label="Minutes" />
                <TimeUnit value={timeElapsed.seconds} label="Seconds" />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-white/60 font-serif italic text-lg mt-12 text-center"
            >
                "...and I've cherished every moment since May 13, 2025."
            </motion.p>
        </section>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md"
        >
            <span className="text-3xl md:text-6xl font-bold font-sans tabular-nums text-white">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-sm md:text-base text-white/50 uppercase tracking-widest mt-2">{label}</span>
        </motion.div>
    );
}
