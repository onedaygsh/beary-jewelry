'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBraceletStore } from '@/store/useBraceletStore'
import { ShoppingBag, RotateCcw } from 'lucide-react'
import BraceletCanvas from './BraceletCanvas'
import MaterialPanel from './MaterialPanel'
import { useCartStore } from '@/store/useCartStore'

export default function DIYConfigurator() {
    const { beads, totalPrice, circumference, reset } = useBraceletStore()
    const { addToCart } = useCartStore()

    const handleAddToCart = () => {
        if (beads.length === 0) return
        addToCart(beads, totalPrice)
    }

    return (
        <div className="w-full h-full flex flex-col relative bg-[#F5F1E8] text-[#4A4036] rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl">
            {/* Header / Circumference Indicator */}
            <div className="absolute top-6 flex justify-between w-full z-10 px-6">
                <div className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-sm flex items-center gap-2">
                    <span className="text-xs font-serif tracking-wider uppercase opacity-60">Size</span>
                    <span className="text-sm font-bold font-mono text-[#D4AF37]">{circumference.toFixed(0)}mm</span>
                </div>

                <button
                    onClick={reset}
                    className="p-2 bg-white/80 rounded-full hover:bg-white text-[#4A4036]/60 hover:text-red-500 transition-colors"
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Main Stage (Canvas) */}
            <div className="flex-1 relative flex items-center justify-center bg-gradient-radial from-[#FDFBF7] to-[#EAE6DB]">
                <div className="relative w-full h-full flex items-center justify-center">
                    <BraceletCanvas />
                </div>
            </div>

            {/* Bottom Controls */}
            <div className=" bg-white/60 backdrop-blur-xl border-t border-[#D4AF37]/10 p-6">

                {/* Material Selector Component */}
                <MaterialPanel />

                {/* Footer: Price & CTA */}
                <div className="flex items-center justify-between border-t border-[#4A4036]/10 pt-6">
                    <div>
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Estimated Total</p>
                        <motion.p
                            key={totalPrice}
                            initial={{ scale: 0.9, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-3xl font-serif text-[#4A4036]"
                        >
                            ${totalPrice}
                        </motion.p>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={beads.length === 0}
                        className={`px-8 py-3 rounded-full flex items-center gap-3 transition-all shadow-lg
                            ${beads.length === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-[#4A4036] text-[#F5F1E8] hover:bg-[#2B2520] hover:scale-105 shadow-[#4A4036]/20'
                            }`}
                    >
                        <ShoppingBag size={18} />
                        <span className="font-bold tracking-wider text-sm">ADD TO CART</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
