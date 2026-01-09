import React, { useMemo, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'

interface BeadModelProps {
    url: string
    position?: THREE.Vector3
    quaternion?: THREE.Quaternion
    scale?: number
    color?: string
}

export function BeadModel({ url, position, quaternion, scale = 1, color }: BeadModelProps) {
    // const { scene } = useGLTF(url) // Assets are missing
    const [hovered, setHovered] = useState(false)

    // Physics-based spring animation
    const { springScale, springRotation } = useSpring({
        springScale: hovered ? 1.1 : 1,
        springRotation: hovered ? [0.2, 0, 0] : [0, 0, 0],
        config: { mass: 1, tension: 280, friction: 60 }
    })

    // Determine material props based on SKU type
    const isGem = url.includes('agate') || url.includes('jade') || url.includes('quartz') || url.includes('obsidian')
    const isMetal = url.includes('gold')
    const isCrystal = url.includes('quartz') // Explicit crystal type

    return (
        <animated.group
            position={position}
            quaternion={quaternion}
            scale={springScale.to(s => [scale * s, scale * s, scale * s])}
            rotation={springRotation as any}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
                setHovered(false)
                document.body.style.cursor = 'auto'
            }}
        >
            {/* Fallback Geometry since assets are missing */}
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.5, 64, 64]} />
                {isCrystal ? (
                    // Crystal Material (Physics-based Transmission)
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transmission={1.0}
                        opacity={1.0}
                        metalness={0.0}
                        roughness={0.0}
                        ior={1.5}
                        thickness={1.0} // Refraction volume
                        specularIntensity={1.0}
                        envMapIntensity={3.0}
                        toneMapped={false}
                    />
                ) : isMetal ? (
                    // Gold Material (Kintsugi)
                    <meshPhysicalMaterial
                        color="#C5A065" // Antique Gold
                        metalness={1.0}
                        roughness={0.15}
                        clearcoat={1.0}
                        clearcoatRoughness={0.1}
                        envMapIntensity={2.0}
                    />
                ) : (
                    // Daqi Lacquer Material (Dynamic Color)
                    <meshPhysicalMaterial
                        color={hovered ? "#A03030" : (color || "#8A3324")} // Use prop color or default cinnabar
                        metalness={0.0}
                        roughness={0.2} // Base texture
                        clearcoat={1.0} // The key "Lacquer" layer
                        clearcoatRoughness={0.05} // Ultra smooth top coat
                        reflectivity={1.0}
                        ior={1.5}
                        envMapIntensity={2.5}
                    />
                )}
            </mesh>
        </animated.group>
    )
}

// Preload common assets to avoid pop-in
// useGLTF.preload('/agate.glb')
// useGLTF.preload('/jade.glb')
// useGLTF.preload('/quartz.glb')
// useGLTF.preload('/obsidian.glb')
// useGLTF.preload('/gold.glb')
