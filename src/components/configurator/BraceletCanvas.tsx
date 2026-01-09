'use client'

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBraceletStore } from '@/store/useBraceletStore'
import { calculateBeadPositions } from '@/utils/braceletMath'

export default function BraceletCanvas() {
    const { beads, removeBead } = useBraceletStore()

    // Canvas Settings
    const SIZE = 500
    const CX = SIZE / 2
    const CY = SIZE / 2
    const RADIUS = 160 // Sligthly smaller to fit beads

    // Only recalculate positions when beads change
    const positions = useMemo(() => {
        if (beads.length === 0) return []
        return calculateBeadPositions(beads.length, RADIUS, CX, CY)
    }, [beads.length])

    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-transparent">
            <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="w-full h-full max-w-[90%] max-h-[90%] drop-shadow-xl"
                style={{ overflow: 'visible' }}
            >
                {/* Defs: Filters for 3D Realism */}
                <defs>
                    {/* Inner Shadow / Specular Highlight for Sphere effect */}
                    <filter id="bead-3d">
                        {/* 1. Blur the Source to create soft shadow base */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />

                        {/* 2. Specular Lighting for Shine */}
                        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffffff" result="specOut">
                            <fePointLight x="-5000" y="-10000" z="20000" />
                        </feSpecularLighting>

                        {/* 3. Composite Specular on top of Source */}
                        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />

                        {/* 4. Drop Shadow */}
                        <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* The Golden String (Under beads) */}
                <motion.circle
                    cx={CX}
                    cy={CY}
                    r={RADIUS}
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5" // Thinner, elegant wire
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* The Beads */}
                <AnimatePresence mode='popLayout'>
                    {beads.map((bead, index) => {
                        const pos = positions[index]
                        if (!pos) return null

                        return (
                            <motion.g
                                key={bead.id}
                                layout
                                initial={{ scale: 0, opacity: 0, x: CX, y: CY }}
                                animate={{
                                    x: pos.x,
                                    y: pos.y,
                                    rotate: pos.rotation,
                                    scale: 1,
                                    opacity: 1
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 25,
                                    // mass: 0.8
                                }}
                                onClick={() => removeBead(index)}
                                className="cursor-pointer group"
                            >
                                {/* Bead Shape */}
                                <circle
                                    r={16} // Bead Size
                                    fill={bead.color || '#FDFCF5'} // Default pearl color
                                    stroke="none"
                                    // Apply the 3D filter
                                    filter="url(#bead-3d)"
                                />

                                {/* Letter Text */}
                                {bead.type === 'letter' && (
                                    <text
                                        textAnchor="middle"
                                        dy=".3em"
                                        fill="#8B6914" // Darker Gold for text
                                        fontSize="14"
                                        fontFamily="serif"
                                        fontWeight="bold"
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {bead.value}
                                    </text>
                                )}

                                {/* Delete Overlay (Hover) */}
                                <circle
                                    r={16}
                                    fill="black"
                                    fillOpacity="0"
                                    className="group-hover:fillOpacity-20 transition-all"
                                />
                            </motion.g>
                        )
                    })}
                </AnimatePresence>

                {/* Empty State Hint */}
                {beads.length === 0 && (
                    <motion.foreignObject x={CX - 100} y={CY - 20} width="200" height="40">
                        <div className="text-center text-[#4A4036]/30 text-xs uppercase tracking-widest font-serif">
                            Touch beads to add
                        </div>
                    </motion.foreignObject>
                )}
            </svg>
        </div>
    )
}
