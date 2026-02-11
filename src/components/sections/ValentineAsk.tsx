"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Calendar, MapPin } from "lucide-react";

import { Map, MapMarker, MarkerContent } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

export default function ValentineAsk() {
    const [accepted, setAccepted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [isHoveringNo, setIsHoveringNo] = useState(false);

    // Coordinates for PANEÒLIO Pizza Bar, Caldas da Rainha
    const LOCATION = {
        lat: 39.410844,
        lng: -9.146547,
        name: "PANEÒLIO Pizza Bar",
        time: "14:00"
    };

    const handleYes = () => {
        setAccepted(true);
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const moveNoButton = () => {
        const x = Math.random() * 600 - 300; // Wider range -300 to 300
        const y = Math.random() * 600 - 300; // Wider range -300 to 300
        setNoBtnPosition({ x, y });
        setIsHoveringNo(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative z-10 py-20 pointer-events-none">
            {/* Container for content that should be interactive */}
            <div className="pointer-events-auto w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
                {!accepted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-12"
                    >
                        <h2 className="text-3xl md:text-7xl font-serif text-white tracking-tight drop-shadow-xl">
                            Will you be my Valentine?
                        </h2>

                        <div className="flex items-center justify-center gap-6 md:gap-12 relative h-40 w-full">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleYes}
                                className="px-6 py-3 md:px-10 md:py-5 bg-pink-600/20 backdrop-blur-md border border-pink-500/50 rounded-full text-xl md:text-3xl font-bold text-white hover:bg-pink-600/40 transition-all shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center gap-3 group z-20"
                            >
                                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 group-hover:scale-125 transition-transform" />
                                YES
                            </motion.button>

                            <motion.button
                                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onHoverStart={moveNoButton}
                                onClick={moveNoButton}
                                className="px-4 py-2 md:px-8 md:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-lg md:text-xl font-medium text-white/50 hover:text-white transition-colors absolute md:relative"
                                style={{
                                    position: isHoveringNo ? 'absolute' : 'relative',
                                    left: isHoveringNo ? 'auto' : undefined,
                                    top: isHoveringNo ? 'auto' : undefined
                                }}
                            >
                                NO
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl"
                    >
                        <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white overflow-hidden shadow-2xl">
                            <div className="p-8 text-center space-y-6">
                                <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                    <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
                                </div>

                                <h3 className="text-4xl font-serif text-white">It&apos;s a date! ❤️</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left bg-black/20 p-6 rounded-xl border border-white/10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-pink-400" />
                                            <span className="text-lg">February 14th</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 flex items-center justify-center text-pink-400 font-bold text-sm">🕒</div>
                                            <span className="text-lg">{LOCATION.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-pink-400" />
                                            <span className="text-lg">{LOCATION.name}</span>
                                        </div>
                                        <a
                                            href="https://maps.app.goo.gl/E5Sr7vpABhTfZvrdA"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-sm text-pink-400 hover:text-pink-300 underline mt-2"
                                        >
                                            Open in Google Maps
                                        </a>
                                    </div>

                                    <div className="h-48 w-full rounded-lg overflow-hidden border border-white/10 relative">
                                        <Map
                                            center={[LOCATION.lng, LOCATION.lat]}
                                            zoom={15}
                                            styles={{
                                                light: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
                                                dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                                            }}
                                        >
                                            <MapMarker longitude={LOCATION.lng} latitude={LOCATION.lat}>
                                                <MarkerContent>
                                                    <div className="w-8 h-8 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                                                        <MapPin className="w-full h-full fill-pink-500" />
                                                    </div>
                                                </MarkerContent>
                                            </MapMarker>
                                        </Map>
                                    </div>
                                </div>

                                <p className="text-white/60 italic pt-4">I can&apos;t wait to see you.</p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
