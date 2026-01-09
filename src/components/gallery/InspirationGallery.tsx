'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useBraceletStore, Bead } from '@/store/useBraceletStore'
import { ArrowUpRight, Copy } from 'lucide-react'

// --- Mock Data ---

// Helper to generate a dummy bead quickly
const mkBead = (type: Bead['type'], color: string): Bead => ({
    id: Math.random().toString(36),
    type,
    value: '',
    price: type === 'gemstone' ? 50 : 20,
    color,
    texture: ''
})

const SAMPLE_DESIGNS = [
    {
        id: 'design-1',
        title: 'Summer Vibe',
        author: 'Sarah J.',
        image: '/images/gallery/summer.jpg', // Placeholder
        bgColor: 'bg-orange-100',
        config: [
            mkBead('pearl', '#FFF'), mkBead('gemstone', '#FFD700'), mkBead('pearl', '#FFF'),
            mkBead('gemstone', '#FFA500'), mkBead('pearl', '#FFF')
        ]
    },
    {
        id: 'design-2',
        title: 'Classic Pearl',
        author: 'Lumina Studio',
        image: '/images/gallery/pearl.jpg', // Placeholder
        bgColor: 'bg-gray-200',
        config: [
            mkBead('pearl', '#F5F5F5'), mkBead('pearl', '#FFF'), mkBead('pearl', '#F5F5F5'),
            mkBead('pearl', '#FFF'), mkBead('pearl', '#F5F5F5'), mkBead('pearl', '#FFF')
        ]
    },
    {
        id: 'design-3',
        title: 'Boho Chic',
        author: 'Mike T.',
        image: '/images/gallery/boho.jpg', // Placeholder
        bgColor: 'bg-teal-100',
        config: [
            mkBead('gemstone', '#2E8B57'), mkBead('metal', '#D4AF37'), mkBead('gemstone', '#8FBC8F'),
            mkBead('letter', '#D4AF37'), mkBead('gemstone', '#2E8B57')
        ]
    },
    {
        id: 'design-4',
        title: 'Midnight Gold',
        author: 'Guest User',
        image: '/images/gallery/midnight.jpg', // Placeholder
        bgColor: 'bg-blue-900',
        config: [
            mkBead('gemstone', '#000'), mkBead('metal', '#D4AF37'), mkBead('gemstone', '#000'),
            mkBead('gemstone', '#1A1A1A'), mkBead('metal', '#D4AF37')
        ]
    }
]

export default function InspirationGallery() {
    const { loadConfiguration } = useBraceletStore()

    const handleCustomize = (designConfig: Bead[]) => {
        // 1. Load Data
        loadConfiguration(designConfig)

        // 2. Scroll to Top (Configurator)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section className="py-24 px-8 bg-[#F9F7F2]">
            <div className="container mx-auto max-w-[1600px]">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="font-serif text-5xl text-[#4A4036] mb-4">Inspiration Gallery</h2>
                        <p className="text-[#4A4036]/60 text-lg max-w-xl">
                            Discover unique designs from our community. Find a style you love and make it your own.
                        </p>
                    </div>
                </div>

                {/* Grid / Masonry */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SAMPLE_DESIGNS.map((design, index) => (
                        <div
                            key={design.id}
                            className="group relative flex flex-col gap-4"
                        >
                            {/* Card Image Container */}
                            <div className={`aspect-[3/4] ${design.bgColor} rounded-lg overflow-hidden relative shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2`}>
                                {/* Placeholder for Image if not real */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <span className="font-serif text-3xl italic text-[#4A4036]">{design.title}</span>
                                </div>

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-[#4A4036]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center p-6">
                                    <button
                                        onClick={() => handleCustomize(design.config)}
                                        className="bg-[#F5F1E8] text-[#4A4036] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0"
                                    >
                                        <Copy size={14} />
                                        Customize This
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-[#4A4036] font-bold text-lg font-serif">{design.title}</h3>
                                    <p className="text-[#4A4036]/50 text-xs uppercase tracking-wider">by {design.author}</p>
                                </div>
                                <button
                                    onClick={() => handleCustomize(design.config)}
                                    className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0"
                                >
                                    <ArrowUpRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
