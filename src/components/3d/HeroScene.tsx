"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import CrystalHeart from "./CrystalHeart";

export default function HeroScene() {
    return (
        <div className="fixed inset-0 z-0 w-full h-full bg-[#050505]">
            <Canvas
                dpr={[1, 3]} // Support up to 3x pixel ratio (covers 8K)
                gl={{ antialias: true, alpha: false }}
                camera={{ position: [0, 0, 15], fov: 45 }}
            >
                <color attach="background" args={["#050505"]} />
                <fog attach="fog" args={["#050505", 10, 50]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff0f5" />

                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                <Sparkles
                    count={1000}
                    scale={10}
                    size={2}
                    speed={0.4}
                    opacity={0.5}
                    color="#ffffff"
                />

                <Suspense fallback={null}>
                    <CrystalHeart />
                </Suspense>
            </Canvas>
        </div>
    );
}
