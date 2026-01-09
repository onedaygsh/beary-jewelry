'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useBraceletStore, Bead } from '@/store/useBraceletStore'

// Mock Data
const MATERIALS: Omit<Bead, 'id'>[] = [
    { type: 'pearl', value: '', price: 120, color: '#FDFCF5', texture: '' },
    { type: 'pearl', value: '', price: 150, color: '#FADADD', texture: '' }, // Pink
    { type: 'gemstone', value: '', price: 280, color: '#8B0000', texture: '' }, // Ruby
    { type: 'gemstone', value: '', price: 200, color: '#90EE90', texture: '' }, // Jade
    { type: 'letter', value: 'A', price: 80, color: '#FFD700', texture: '' },  // Gold Letter (Mock)
]

export default function MaterialPanel() {
    const { addBead } = useBraceletStore()

    return (
        <div className="mb-8">
            <h3 className="text-xs font-serif font-bold uppercase tracking-widest mb-4 opacity-50 pl-1">Select Material</h3>

            <motion.div
                className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 scrollbar-hide"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {MATERIALS.map((mat, i) => (
                    <motion.button
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addBead(mat)}
                        className="flex flex-col items-center gap-2 group min-w-[60px] outline-none"
                    >
                        <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37]/20 shadow-sm group-hover:shadow-md transition-shadow relative overflow-hidden">
                            {/* Visual Mock */}
                            <div
                                className="w-full h-full"
                                style={{ backgroundColor: mat.color }}
                            />
                            {mat.type === 'letter' && (
                                <span className="absolute inset-0 flex items-center justify-center font-serif font-bold text-[#4A4036]">A</span>
                            )}
                        </div>
                        <span className="text-[10px] uppercase font-bold opacity-60 group-hover:text-[#D4AF37] transition-colors">
                            ${mat.price}
                        </span>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    )
}
