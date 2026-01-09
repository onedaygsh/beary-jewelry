'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, CameraControls, Html, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette, Outline, Selection, Select } from '@react-three/postprocessing'
import { Bracelet } from './Bracelet'
import * as THREE from 'three'
import { useStore } from '@/store/useStore'
import { BeadType } from '@/data/skus'
import { braceletCurve } from '@/utils/braceletCurve'
import Loader from '@/components/Loader'

function DropLogic() {
    const { camera, raycaster, scene } = useThree()
    const addBead = useStore((state) => state.addBead)
    const [ghostPos, setGhostPos] = useState<THREE.Vector3 | null>(null)

    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault()

            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            )

            raycaster.setFromCamera(mouse, camera)
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
            const target = new THREE.Vector3()
            if (raycaster.ray.intersectPlane(plane, target)) {
                // Find closest point
                let bestT = 0
                let minDist = Infinity
                const divisions = 100
                for (let i = 0; i <= divisions; i++) {
                    const t = i / divisions
                    const pt = braceletCurve.getPointAt(t)
                    const d = pt.distanceTo(target)
                    if (d < minDist) {
                        minDist = d
                        bestT = t
                    }
                }
                // Update ghost
                setGhostPos(braceletCurve.getPointAt(bestT))
            }
        }

        const handleDrop = (e: CustomEvent<{ x: number; y: number; beadType: BeadType }>) => {
            const { x, y, beadType } = e.detail;

            // Calculate normalized device coordinates
            const mouse = new THREE.Vector2(
                (x / window.innerWidth) * 2 - 1,
                -(y / window.innerHeight) * 2 + 1
            )

            raycaster.setFromCamera(mouse, camera)
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
            const target = new THREE.Vector3()
            const intersect = raycaster.ray.intersectPlane(plane, target)

            if (intersect) {
                let bestT = 0
                let minDist = Infinity
                const divisions = 100
                for (let i = 0; i <= divisions; i++) {
                    const t = i / divisions
                    const pt = braceletCurve.getPointAt(t)
                    const d = pt.distanceTo(target)
                    if (d < minDist) {
                        minDist = d
                        bestT = t
                    }
                }
                addBead(beadType, bestT)
                setGhostPos(null)
            }
        }

        // Add plain DragOver listener to window to track ghost
        window.addEventListener('dragover', handleDragOver)
        window.addEventListener('bead-drop', handleDrop as any)
        return () => {
            window.removeEventListener('dragover', handleDragOver)
            window.removeEventListener('bead-drop', handleDrop as any)
        }
    }, [camera, raycaster, addBead])

    return ghostPos ? (
        <mesh position={ghostPos}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.6} />
        </mesh>
    ) : null
}

function CameraHandler() {
    const ref = React.useRef<CameraControls>(null)
    const selectedBeadId = useStore(state => state.selectedBeadId)
    const beads = useStore(state => state.beads)

    useEffect(() => {
        if (!ref.current) return

        if (selectedBeadId) {
            const bead = beads.find(b => b.id === selectedBeadId)
            if (bead) {
                const totalLen = braceletCurve.getLength()
                const t = (bead.arcLengthOffset / totalLen) % 1
                const point = braceletCurve.getPointAt(t)

                // Smooth transition to focus on bead
                // Target: bead position
                // Look from: slightly elevated position ? No, just zoom in.

                ref.current.setTarget(point.x, point.y, point.z, true)
                ref.current.dollyTo(3.5, true) // Zoom in
            }
        } else {
            // Reset to default overview
            ref.current.setTarget(0, 0, 0, true)
            ref.current.dollyTo(8, true) // Zoom out
        }
    }, [selectedBeadId, beads])

    return (
        <CameraControls
            ref={ref}
            makeDefault
            maxPolarAngle={Math.PI / 2.2}
            minDistance={2}
            maxDistance={12}
            smoothTime={0.6} // Luxurious ease
            dollySpeed={0.5}
            draggingSmoothTime={0.2}
        />
    )
}

export default function Scene() {
    const selectBead = useStore(state => state.selectBead)
    const [contextLost, setContextLost] = React.useState(false)

    React.useEffect(() => {
        const handleContextLost = (event: Event) => {
            event.preventDefault()
            setContextLost(true)
            console.warn('WebGL context lost')
        }

        const handleContextRestored = () => {
            setContextLost(false)
            console.log('WebGL context restored')
        }

        const canvas = document.querySelector('canvas')
        if (canvas) {
            canvas.addEventListener('webglcontextlost', handleContextLost)
            canvas.addEventListener('webglcontextrestored', handleContextRestored)
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('webglcontextlost', handleContextLost)
                canvas.removeEventListener('webglcontextrestored', handleContextRestored)
            }
        }
    }, [])

    if (contextLost) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                <div className="text-center">
                    <p className="text-gray-600">3D 渲染暂时不可用</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-[#C04035] text-white rounded-sm hover:bg-[#a03529] transition-colors"
                    >
                        重新加载
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Canvas
            shadows
            camera={{ position: [0, 6, 6], fov: 45 }}
            className="w-full h-full"
            dpr={[1, 2]}
            onPointerMissed={() => selectBead(null)}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                preserveDrawingBuffer: false
            }}
        >
            {/* Cinematic Lighting */}
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <Selection>
                <EffectComposer autoClear={false} enableNormalPass={false}>
                    <Outline visibleEdgeColor={0xffd700} hiddenEdgeColor={0xffd700} blur edgeStrength={10} width={1000} />
                    <Bloom luminanceThreshold={1.2} mipmapBlur intensity={0.4} radius={0.4} />
                </EffectComposer>

                <Suspense fallback={<Html center><Loader /></Html>}>
                    <Bracelet />
                </Suspense>
            </Selection>

            <DropLogic />

            {/* Soft Ground Shadows */}
            <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.4}
                scale={20}
                blur={2}
                far={4.5}
                color="#1a1a1a"
            />

            <CameraHandler />
        </Canvas>
    )
}
