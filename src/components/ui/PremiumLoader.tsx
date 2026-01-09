'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function PremiumLoader() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] bg-transparent">
            {/* Glassmorphism Container */}
            <div className="relative p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center gap-8">

                {/* Mobius Strip Icon Pulse */}
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    className="w-16 h-16 border-4 border-[#D4AF37] rounded-full flex items-center justify-center relative"
                >
                    <div className="w-10 h-10 border-2 border-[#D4AF37]/50 rounded-full" />
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full animate-pulse" />
                </motion.div>

                {/* Text */}
                <div className="text-center space-y-2">
                    <h3 className="text-[#F9F7F2] font-serif text-lg tracking-widest">
                        LUMINA LOOP
                    </h3>
                    <motion.p
                        className="text-[#F9F7F2]/60 text-xs tracking-[0.2em] uppercase font-light"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Curating Elements...
                    </motion.p>
                </div>
            </div>
        </div>
    )
}
