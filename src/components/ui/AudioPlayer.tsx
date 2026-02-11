/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useState } from "react";
import {
    Play,
    Pause,
    SkipBack,

    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ghost" | "default", size?: "icon" | "default" }>(
    ({ className, variant: _variant = "default", size: _size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", className)}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

const formatTime = (seconds: number = 0) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CustomSlider = ({
    value,
    onChange,
    className,
}: {
    value: number;
    onChange: (value: number) => void;
    className?: string;
}) => {
    return (
        <div className={cn("relative w-full h-4 flex items-center select-none", className)}>
            <div className="absolute w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-white"
                    style={{ width: `${value}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ type: "tween", duration: 0.1 }}
                />
            </div>
            <input
                type="range"
                min={0}
                max={100}
                value={value || 0}
                onChange={(e) => onChange(Number(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
        </div>
    );
};

const AudioPlayer = ({
    src,
    cover,
    title,
}: {
    src: string;
    cover?: string;
    title?: string;
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const progress =
                (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(isFinite(progress) ? progress : 0);
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (value: number) => {
        if (audioRef.current && audioRef.current.duration) {
            const time = (value / 100) * audioRef.current.duration;
            if (isFinite(time)) {
                audioRef.current.currentTime = time;
                setProgress(value);
            }
        }
    };

    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    const handleVolumeChange = (value: number) => {
        const newVolume = value / 100;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = volume || 1;
                setIsMuted(false);
            } else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    if (!src) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="relative flex flex-col mx-auto rounded-3xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm p-3 w-[280px] h-auto"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.1,
                    type: "spring",
                }}
                layout
            >
                <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    src={src}
                    className="hidden"
                />

                <motion.div
                    className="flex flex-col relative"
                    layout
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Cover  */}
                    {cover && (
                        <motion.div className="bg-white/20 overflow-hidden rounded-[16px] h-[180px] w-full relative">
                            <img
                                src={cover}
                                alt="cover"
                                className="!object-cover w-full my-0 p-0 !mt-0 border-none !h-full"
                            />
                        </motion.div>
                    )}

                    <motion.div className="flex flex-col w-full gap-y-2">
                        {/* Title */}
                        {title && (
                            <motion.h3 className="text-white font-bold text-base text-center mt-1">
                                {title}
                            </motion.h3>
                        )}

                        {/* Slider */}
                        <motion.div className="flex flex-col gap-y-1">
                            <CustomSlider
                                value={progress}
                                onChange={handleSeek}
                                className="w-full"
                            />
                            <div className="flex items-center justify-between">
                                <span className="text-white text-sm">
                                    {formatTime(currentTime)}
                                </span>
                                <span className="text-white text-sm">
                                    {formatTime(duration)}
                                </span>
                            </div>
                        </motion.div>

                        {/* Controls */}
                        <motion.div className="flex items-center justify-center w-full">
                            <div className="flex items-center gap-2 w-fit bg-[#11111198] rounded-[16px] p-2">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShuffle();
                                        }}
                                        className={cn(
                                            "text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full",
                                            isShuffle && "bg-[#111111d1] text-white"
                                        )}
                                    >
                                        <Shuffle className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                                    >
                                        <SkipBack className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePlay();
                                        }}
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                                    >
                                        {isPlaying ? (
                                            <Pause className="h-5 w-5" />
                                        ) : (
                                            <Play className="h-5 w-5" />
                                        )}
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                                    >
                                        <SkipForward className="h-5 w-5" />
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRepeat();
                                        }}
                                        className={cn(
                                            "text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full",
                                            isRepeat && "bg-[#111111d1] text-white"
                                        )}
                                    >
                                        <Repeat className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Volume Control */}
                        <motion.div className="flex items-center w-full px-2 gap-2 mt-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMute();
                                }}
                                className="text-white hover:bg-[#111111d1] hover:text-white h-6 w-6 rounded-full"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX className="h-4 w-4" />
                                ) : (
                                    <Volume2 className="h-4 w-4" />
                                )}
                            </Button>
                            <CustomSlider
                                value={isMuted ? 0 : volume * 100}
                                onChange={handleVolumeChange}
                                className="w-full"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AudioPlayer;
