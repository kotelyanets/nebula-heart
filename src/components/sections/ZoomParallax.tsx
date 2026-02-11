'use client';

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from 'react';
import Image from "next/image";

interface ImageProps {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    /** Array of images. */
    images: ImageProps[];
    /** Index of the image to stay in the center (0-indexed). Default: 0 */
    centerIndex?: number;
}

export default function ZoomParallax({ images, centerIndex = 0 }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    // Pre-defined positions for up to 15 items + 1 center
    // These are Tailwind utility classes to position absolute items
    // Center item gets no extra positioning class (defaults to center)
    const POSITIONS = [
        // 1-6 (Originals)
        '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
        '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
        '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
        '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
        '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
        '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',

        // 7-14 (New expanded positions for 15 total items)
        '[&>div]:!-top-[40vh] [&>div]:!-left-[10vw] [&>div]:!h-[20vh] [&>div]:!w-[20vw]', // Top Left
        '[&>div]:!-top-[35vh] [&>div]:!left-[35vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',  // Top Right
        '[&>div]:!top-[40vh] [&>div]:!left-[35vw] [&>div]:!h-[20vh] [&>div]:!w-[25vw]',   // Bottom Right
        '[&>div]:!top-[45vh] [&>div]:!-left-[30vw] [&>div]:!h-[20vh] [&>div]:!w-[20vw]',  // Bottom Left
        '[&>div]:!-top-[5vh] [&>div]:!-left-[40vw] [&>div]:!h-[30vh] [&>div]:!w-[15vw]',  // Far Left 
        '[&>div]:!top-[10vh] [&>div]:!left-[42vw] [&>div]:!h-[25vh] [&>div]:!w-[15vw]',   // Far Right
        '[&>div]:!-top-[25vh] [&>div]:!left-[20vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',  // Inner Top Right
        '[&>div]:!top-[35vh] [&>div]:!-left-[10vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',  // Inner Bottom
    ];

    // Helper to get position based on satellite index
    const getPositionClass = (satelliteIndex: number) => {
        return POSITIONS[satelliteIndex % POSITIONS.length];
    };

    return (
        <div ref={container} className="relative h-[300vh] w-full z-10">
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map(({ src, alt }, index) => {
                    const isCenter = index === centerIndex;

                    // Assign a scale from the pool based on index to randomize speed slightly
                    // But maybe keep center always scale4 (slowest) or scale9 (fastest)?
                    // Usually center zooms out slowly or stays? 
                    // Let's use scale4 for center usually.
                    const scale = isCenter ? scale4 : scales[index % scales.length];

                    // Determine position:
                    // If it is the user's chosen centerIndex, it gets NO extra class (centered by default flex)
                    // Otherwise, we map it to one of our satellite positions.
                    // We need a stable mapping. 
                    // Let's say we just skip the centerIndex in our "count"
                    let posClass = '';
                    if (!isCenter) {
                        // If index is 0,1,2...9 (center)...14
                        // We want 0->pos0, 1->pos1 ... 9->SKIP ... 10->pos9 
                        const adjustedIndex = index < centerIndex ? index : index - 1;
                        posClass = getPositionClass(adjustedIndex);
                    }

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${posClass}`}
                        >
                            <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-lg shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                                <Image
                                    src={src}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    fill
                                    quality={100}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
