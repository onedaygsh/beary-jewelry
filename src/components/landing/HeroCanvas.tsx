'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { braceletCurve } from '@/utils/braceletCurve'
import { BeadModel } from '@/components/3d/BeadModel'
import * as THREE from 'three'

// Hardcoded "Hero" configuration for a perfect first impression
// 18 beads to form a complete circle
const BEAD_TYPES = [
    { skuId: 'lacquer_cinnabar', color: '#8A3324' },
    { skuId: 'gold_round', color: '#D4AF37' },
    { skuId: 'lacquer_teal', color: '#2A9D8F' },
    { skuId: 'obsidian_black', color: '#1A1A1A' },
    { skuId: 'lacquer_amber', color: '#E9C46A' },
    { skuId: 'lacquer_verdant', color: '#2E8B57' },
    { skuId: 'lacquer_purple', color: '#7B2CBF' },
    { skuId: 'gold_round', color: '#D4AF37' },
    { skuId: 'lacquer_indigo', color: '#264653' },
]

const HERO_BEADS = Array.from({ length: 18 }, (_, i) => {
    const type = BEAD_TYPES[i % BEAD_TYPES.length]
    return {
        id: `hero-bead-${i}`,
        skuId: type.skuId,
        t: i / 18,
        color: type.color
    }
})

function HeroBracelet() {
    return (
        <group scale={3.2} position={[0, 2.5, 0]} rotation={[Math.PI / 8, 0, 0]}>
            {HERO_BEADS.map((bead) => {
                const point = braceletCurve.getPointAt(bead.t)
                const tangent = braceletCurve.getTangentAt(bead.t).normalize()
                const up = new THREE.Vector3(0, 1, 0)
                const quaternion = new THREE.Quaternion().setFromUnitVectors(up, tangent)

                return (
                    <BeadModel
                        key={bead.id}
                        url={`/${bead.skuId}.glb`}
                        position={point}
                        quaternion={quaternion}
                        scale={1.25} // Balanced scale to prevent overlap while appearing large via Group Scale
                        color={bead.color}
                    />
                )
            })}
            {/* The String (Visual only) */}
            <mesh>
                <tubeGeometry args={[braceletCurve, 64, 0.04, 8, true]} />
                <meshPhysicalMaterial
                    color="#D4AF37"
                    transparent
                    opacity={0.8}
                    roughness={0.2}
                    metalness={1}
                />
            </mesh>
        </group>
    )
}

export default function HeroCanvas() {
    return (
        <div className="w-full h-full relative">
            <Canvas
                shadows
                camera={{ position: [0, 8, 20], fov: 75 }}
                dpr={[1, 1.5]} // Optimize for performance
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault()
                        console.log('WebGL context lost, attempting recovery...')
                    })
                    gl.domElement.addEventListener('webglcontextrestored', () => {
                        console.log('WebGL context restored')
                    })
                }}
            >
                <Suspense fallback={null}>
                    {/* 1. Studio Environment */}
                    <Environment preset="studio" background={false} environmentIntensity={1.5} />

                    {/* Add some manual lights to accent the "dark aesthetic" */}
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                        castShadow
                        color="#ffffff"
                    />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#C04035" /> {/* Red accent light */}

                    {/* 2. Floating Hero Bracelet */}
                    <Float
                        speed={2}
                        rotationIntensity={0.5}
                        floatIntensity={0.5}
                        floatingRange={[-0.2, 0.2]}
                    >
                        <HeroBracelet />
                    </Float>

                    {/* 3. Grounding Shadows */}
                    <ContactShadows
                        resolution={1024}
                        scale={20}
                        blur={2.5}
                        opacity={0.4}
                        far={10}
                        color="#000000"
                    />

                    {/* Controls - Full 360° rotation enabled */}
                    {/* Controls - Right Click to Rotate */}
                    <OrbitControls
                        enableZoom={true}
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        mouseButtons={{
                            LEFT: THREE.MOUSE.PAN, // Or null if strictly right click
                            MIDDLE: THREE.MOUSE.DOLLY,
                            RIGHT: THREE.MOUSE.ROTATE
                        }}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}
