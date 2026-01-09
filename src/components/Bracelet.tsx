'use client'

import React, { useState, useEffect, useRef } from 'react'
import { braceletCurve } from '@/utils/braceletCurve'
import { BeadModel } from '@/components/3d/BeadModel'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import { useStore } from '@/store/useStore'

const TOTAL_LENGTH = braceletCurve.getLength()

export function Bracelet() {
    const beads = useStore((state) => state.beads)
    const removeBead = useStore((state) => state.removeBead)
    const selectBead = useStore(state => state.selectBead)
    const selectedBeadId = useStore(state => state.selectedBeadId) // Add this
    const skuDefs = useStore(state => state.skuDefs)
    const curve = braceletCurve

    // State for dragging
    const [draggingId, setDraggingId] = useState<string | null>(null)
    const [willDelete, setWillDelete] = useState(false)
    const [hovered, setHovered] = useState<string | null>(null)

    // Refs for window event listeners
    const draggingIdRef = useRef<string | null>(null)
    const { camera, raycaster, gl } = useThree()

    useEffect(() => {
        draggingIdRef.current = draggingId

        const handlePointerMove = (e: PointerEvent) => {
            if (!draggingIdRef.current) return

            // Check if mouse is far from the bracelet curve
            // We reuse the Raycaster from useThree, but need to set it manually
            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            )
            raycaster.setFromCamera(mouse, camera)

            // Check distance to plane at y=0 (approx where bracelet is)
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
            const target = new THREE.Vector3()

            if (raycaster.ray.intersectPlane(plane, target)) {
                // Find distance to curve
                let minDist = Infinity
                const divisions = 20
                for (let i = 0; i <= divisions; i++) {
                    const t = i / divisions
                    const pt = braceletCurve.getPointAt(t)
                    const d = pt.distanceTo(target)
                    if (d < minDist) minDist = d
                }

                // If dragged more than 2 units away, consider deleting
                if (minDist > 2.0) {
                    setWillDelete(true)
                    document.body.style.cursor = 'no-drop'
                } else {
                    setWillDelete(false)
                    document.body.style.cursor = 'grabbing'
                }
            } else {
                // Off plane usually means far away too
                setWillDelete(true)
            }
        }

        const handlePointerUp = (e: PointerEvent) => {
            if (draggingIdRef.current) {
                // Check if we should delete
                // We rely on the last state of 'willDelete'. 
                // However, state in event listener might be stale if closure is not handled.
                // But we set state which triggers re-render.
                // Better: recalculate or just check the state setter logic?
                // Actually, let's just use the ref logic or duplicate the check?
                // To keep it simple: we trust the visual feedback state 'willDelete' is mostly synced, 
                // BUT for the action, let's re-verify logic to be safe or use a Ref for willDelete.

                // Since hooks are tricky inside listener, let's re-run the distance check is safest.
                // Or use a Ref for willDelete.

                // Hack: We can just use the last known "willDelete" if we put it in a Ref?
                // Let's implement the Ref for willDelete
            }
            setDraggingId(null)
            setWillDelete(false)
            document.body.style.cursor = 'auto'
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
        }
    }, [camera, raycaster])

    // We need a separate effect to handle the actual deletion because of the stale closure in the listener
    // Or we use a Ref for willDelete
    const willDeleteRef = useRef(false)
    useEffect(() => { willDeleteRef.current = willDelete }, [willDelete])

    useEffect(() => {
        const handleUp = () => {
            if (draggingIdRef.current && willDeleteRef.current) {
                removeBead(draggingIdRef.current)
            }
        }
        window.addEventListener('pointerup', handleUp)
        return () => window.removeEventListener('pointerup', handleUp)
    }, [removeBead])


    return (
        <group>
            {/* The String (Tube) */}
            <mesh>
                <tubeGeometry args={[curve, 64, 0.02, 8, true]} />
                <meshPhysicalMaterial
                    color="#4A4A4A"
                    transparent
                    opacity={0.6}
                    roughness={0.2}
                    metalness={0.1}
                />
            </mesh>

            {/* The Beads */}
            {beads.map((bead) => {
                // Convert Arc Length to T (0-1)
                let t = (bead.arcLengthOffset / TOTAL_LENGTH) % 1
                if (t < 0) t += 1

                const point = curve.getPointAt(t)
                const tangent = curve.getTangentAt(t).normalize()
                const sku = skuDefs[bead.skuId]

                const up = new THREE.Vector3(0, 1, 0)
                const quaternion = new THREE.Quaternion().setFromUnitVectors(up, tangent)

                if (!sku) return null

                // Visual Feedback for Deletion
                const isDraggingThis = draggingId === bead.id
                const visualScale = (isDraggingThis && willDelete) ? 0.0 : (hovered === bead.id ? 1.1 : 1)
                const visualOpacity = (isDraggingThis && willDelete) ? 0.5 : 1
                const visualColor = (isDraggingThis && willDelete) ? "#FF0000" : undefined

                const isSelected = selectedBeadId === bead.id

                return (
                    <Select enabled={isSelected} key={bead.id}>
                        <group
                            onPointerDown={(e) => {
                                e.stopPropagation() // Stop OrbitControls
                                selectBead(bead.id) // Select it
                                // @ts-ignore
                                e.target.setPointerCapture(e.pointerId)
                                setDraggingId(bead.id)
                                document.body.style.cursor = 'grabbing'
                            }}
                            onPointerOver={(e) => {
                                e.stopPropagation()
                                if (!draggingId) {
                                    document.body.style.cursor = 'pointer'
                                    setHovered(bead.id)
                                }
                            }}
                            onPointerOut={(e) => {
                                if (!draggingId) {
                                    document.body.style.cursor = 'auto'
                                    setHovered(null)
                                }
                            }}
                        >
                            <BeadModel
                                url={sku.modelUrl}
                                position={point}
                                quaternion={quaternion}
                                scale={visualScale}
                                color={sku.color}
                            />
                            {/* Red Ghost Indicator if Deleting */}
                            {isDraggingThis && willDelete && (
                                <mesh position={point}>
                                    <sphereGeometry args={[0.3, 16, 16]} />
                                    <meshBasicMaterial color="red" transparent opacity={0.3} />
                                </mesh>
                            )}
                        </group>
                    </Select>
                )
            })}
        </group>
    )
}
