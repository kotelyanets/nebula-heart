"use client";

import React, { useRef, useMemo, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function CrystalHeart() {
    const mesh = useRef<THREE.Mesh>(null);

    useLayoutEffect(() => {
        if (mesh.current) {
            mesh.current.geometry.center();
        }
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        const t = state.clock.getElapsedTime();
        // Slow rotation
        mesh.current.rotation.y = t * 0.2;
        mesh.current.rotation.z = Math.sin(t * 0.5) * 0.05;

        // Breathing scale animation
        const scale = 0.1 + Math.sin(t * 1.5) * 0.005;
        mesh.current.scale.set(scale, scale, scale);
    });

    const heartShape = useMemo(() => {
        const shape = new THREE.Shape();
        const x = 0, y = 0;

        shape.moveTo(x + 25, y + 25);
        shape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
        shape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
        shape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
        shape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
        shape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
        shape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

        return shape;
    }, []);

    const extrudeSettings = {
        depth: 30,
        bevelEnabled: true,
        bevelSegments: 10,
        steps: 2,
        bevelSize: 5,
        bevelThickness: 5,
        curveSegments: 64, // smoother
    };

    return (
        <group dispose={null}>
            {/* Centering the heart manually with geometry.center() */}
            <mesh ref={mesh} rotation={[Math.PI, 0, 0]}>
                <extrudeGeometry args={[heartShape, extrudeSettings]} />
                <MeshTransmissionMaterial
                    backside={false}
                    samples={12} // Optimized: 12 is sufficient for this blur level
                    resolution={1024} // Optimized: 1K is visibly identical to 4K for this size but much faster
                    transmission={1}
                    roughness={0}
                    thickness={3.5}
                    ior={1.5}
                    chromaticAberration={0.06}
                    anisotropy={20}
                    distortion={0.1}
                    distortionScale={0.3}
                    temporalDistortion={0.5}
                    clearcoat={1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                />
            </mesh>
            <Environment preset="studio" blur={1} />
        </group>
    );
}
