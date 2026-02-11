"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type CardType = {
    title: string;
    src: string;
};

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
        onClick,
    }: {
        card: CardType;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
        onClick: () => void;
    }) => (
        <motion.div
            layoutId={`card-${card.title}-${index}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={onClick}
            className={cn(
                "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
            )}
        >
            <Image
                src={card.src}
                alt={card.title}
                fill
                className="object-cover absolute inset-0"
            />
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end py-8 px-4 transition-opacity duration-300",
                    hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                {/* {card.title} */}
            </div>
        </motion.div>
    )
);

Card.displayName = "Card";



export function FocusCards({ cards }: { cards: CardType[] }) {
    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<{ card: CardType; index: number } | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
                {cards.map((card, index) => (
                    <Card
                        key={card.title + index}
                        card={card}
                        index={index}
                        hovered={hovered}
                        setHovered={setHovered}
                        onClick={() => setSelected({ card, index })}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            layoutId={`card-${selected.card.title}-${selected.index}`}
                            className="relative w-full max-w-5xl h-full max-h-[90vh] md:h-[80vh] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl z-50"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelected(null);
                                }}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <Image
                                src={selected.card.src}
                                alt={selected.card.title}
                                fill
                                className="object-contain"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                                {/* 
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                                >
                                    {selected.card.title}
                                </motion.h3> 
                                */}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
