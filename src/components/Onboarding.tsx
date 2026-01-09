'use client'

import React, { useEffect, useState } from 'react'

export default function Onboarding() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const hasSeen = localStorage.getItem('hasSeenTutorial')
        if (!hasSeen) {
            // Tiny delay for smooth entry
            const t = setTimeout(() => setVisible(true), 1000)
            return () => clearTimeout(t)
        }
    }, [])

    const handleDismiss = () => {
        localStorage.setItem('hasSeenTutorial', 'true')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-700 animate-in fade-in">
            <div className="bg-[#F9F7F2] p-8 rounded-xl shadow-2xl max-w-sm text-center border border-[#D4AF37] relative overflow-hidden">

                {/* Decorative Corner */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#C04035] opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#C04035] opacity-20"></div>

                <h2 className="text-2xl font-serif text-[#2B2B2B] mb-4 tracking-widest">欢迎</h2>

                <div className="my-6 space-y-4 text-sm text-[#2B2B2B]/70 font-sans tracking-wide">
                    <p>1. 拖拽左侧的珠子到手串上。</p>
                    <p>2. 点击珠子可选中 (金边高亮)。</p>
                    <p>3. 将珠子向外拖拽即可删除。</p>
                </div>

                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-[#2B2B2B]/10 rounded-full flex items-center justify-center animate-bounce">
                        {/* Hand Icon (SVG) */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" strokeWidth="2">
                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                        </svg>
                    </div>
                </div>

                <button
                    onClick={handleDismiss}
                    className="mt-8 px-8 py-2 bg-[#C04035] text-[#F9F7F2] rounded-full hover:bg-[#A03030] transition-colors tracking-[0.2em] shadow-lg"
                >
                    开始创作
                </button>
            </div>
        </div>
    )
}
