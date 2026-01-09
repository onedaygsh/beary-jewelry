'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useStore } from '@/store/useStore'
import { useSkus } from '@/hooks/useSkus'
import { useCurrency } from '@/hooks/useCurrency'
import { BeadSku, BeadType } from '@/data/skus'

const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'gem', label: 'Gemstones' },
    { id: 'metal', label: 'Metals' },
    { id: 'charm', label: 'Charms' },
]

export function Palette() {
    const t = useTranslations('General')
    const locale = useLocale()
    const { formatPrice } = useCurrency()
    const { skus, isLoading } = useSkus()
    const addBead = useStore((state) => state.addBead)
    const [activeTab, setActiveTab] = useState('all')

    // Helper to get localized name
    const getName = (sku: BeadSku) => {
        if (typeof sku.name === 'string') return sku.name
        return (sku.name as any)[locale] || sku.name['en']
    }

    // Helper to get price value
    const getPrice = (sku: BeadSku) => {
        if (typeof sku.price === 'number') return sku.price
        return sku.price.base
    }

    // Filter Logic
    const filteredSkus = useMemo(() => {
        return skus.filter(sku => {
            if (activeTab === 'all') return true
            if (activeTab === 'gem') return sku.materialType === 'gem' || sku.materialType === 'matte'
            if (activeTab === 'metal') return sku.materialType === 'metal'
            // For now, if no charms exist, this returns empty, which is fine
            if (activeTab === 'charm') return false
            return false
        })
    }, [skus, activeTab])

    const handleDragStart = (e: React.DragEvent, sku: BeadSku) => {
        e.dataTransfer.setData('bead-type', sku.id)
        e.dataTransfer.effectAllowed = 'copy'
    }

    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-8 pointer-events-auto z-20">
            <div className="bg-[#F9F7F2]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#D4AF37]/20 flex flex-col gap-4 max-h-[85vh] min-w-[300px] w-[320px]">

                {/* Header */}
                <div className="text-center border-b border-[#2B2B2B]/10 pb-2">
                    <h2 className="font-serif text-[#2B2B2B] text-lg tracking-widest">{t('palette')}</h2>
                    <p className="text-[10px] text-[#2B2B2B]/50 uppercase tracking-widest mt-1">Select Material</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-gray-100/50 p-1 rounded-full relative">
                    {CATEGORIES.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 relative z-10 py-1.5 text-[10px] font-sans uppercase tracking-wider transition-colors duration-200 ${isActive ? 'text-[#2B2B2B] font-bold' : 'text-[#2B2B2B]/60 hover:text-[#2B2B2B]'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-[#D4AF37]/10"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        style={{ zIndex: -1 }}
                                    />
                                )}
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-[400px]">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-20 bg-gray-200 rounded-full w-full animate-pulse"></div>)
                    ) : (
                        <AnimatePresence mode='popLayout'>
                            {filteredSkus.map((sku) => (
                                <BeadItem
                                    key={sku.id}
                                    sku={sku}
                                    getName={getName}
                                    formatPrice={formatPrice}
                                    getPrice={getPrice}
                                    onDragStart={handleDragStart}
                                    onAdd={() => addBead(sku.id, 0.5)}
                                />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    )
}

// Extracted Item for better animation handling
function BeadItem({ sku, getName, formatPrice, getPrice, onDragStart, onAdd }: {
    sku: BeadSku,
    getName: (s: BeadSku) => string,
    formatPrice: (n: number) => string,
    getPrice: (s: BeadSku) => number,
    onDragStart: (e: React.DragEvent, s: BeadSku) => void,
    onAdd: () => void
}) {
    // Ripple State
    const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([])

    const handleClick = (e: React.MouseEvent) => {
        // Add Ripple
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const newRipple = { x, y, id: Date.now() }
        setRipples(prev => [...prev, newRipple])

        // Add Bead
        onAdd()

        // Cleanup Ripple
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id))
        }, 600)
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="group relative flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, sku)} // Cast to unknown then DragEvent to satisfy TS if motion conflicts
            onClick={handleClick}
        >
            <div className="w-14 h-14 rounded-full shadow-md relative overflow-hidden ring-1 ring-[#D4AF37]/20 group-hover:ring-[#C04035] group-hover:shadow-xl transition-all bg-white">
                <div
                    className="w-full h-full"
                    style={{ backgroundColor: sku.color }}
                />

                {/* Lustre Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-white/40 rounded-full blur-[1px]" />

                {/* Ripples */}
                {ripples.map(r => (
                    <span
                        key={r.id}
                        className="absolute rounded-full bg-white/60 animate-ripple pointer-events-none"
                        style={{
                            left: r.x,
                            top: r.y,
                            width: 10,
                            height: 10,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}
            </div>

            <div className="text-center w-full">
                <span className="block font-serif text-[#2B2B2B] text-xs font-medium tracking-wide truncate px-1 group-hover:text-[#C04035] transition-colors">
                    {getName(sku)}
                </span>
                <span className="block font-sans text-[10px] text-[#2B2B2B]/50 uppercase tracking-widest mt-0.5">
                    {formatPrice(getPrice(sku))}
                </span>
            </div>
        </motion.div>
    )
}
