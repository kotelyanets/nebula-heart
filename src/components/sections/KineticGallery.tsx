/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity, type MotionValue } from "framer-motion";

const images = [
    "https://images.pexels.com/photos/1010648/pexels-photo-1010648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const KineticGridItem = ({ image, scrollVelocity }: { image: string, scrollVelocity: MotionValue<number> }) => {
    // Transform scroll velocity to skew angle
    const skew = useTransform(scrollVelocity, [-1000, 0, 1000], [-15, 0, 15], { clamp: false });

    return (
        <motion.div className="w-full h-80 relative overflow-hidden rounded-lg bg-neutral-900 border border-white/10" style={{ skewX: skew }}>
            <img src={image} alt="Memory" className="absolute inset-0 h-full w-full object-cover" style={{ transform: "scale(1.15)" }} />
        </motion.div>
    );
};

export default function KineticScrollGallery() {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    return (
        <div className="bg-transparent text-neutral-50 min-h-screen py-20 relative z-10">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-serif tracking-tight sm:text-5xl text-white">
                        Our Memories
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, index) => (
                        <KineticGridItem key={index} image={img} scrollVelocity={smoothVelocity} />
                    ))}
                </div>
            </div>
        </div>
    );
};
