'use client'

import React from 'react'

export function BrandStory() {
    return (
        <section className="py-16 md:py-20 bg-[#F2F0E9] relative">
            <div className="container mx-auto px-8">
                <div className="flex flex-col items-center text-center mb-12 space-y-6">
                    <h2 className="text-6xl font-serif text-[#4A4A4A] tracking-normal mb-2">
                        材質細節
                    </h2>
                    <p className="text-[#4A4A4A]/60 text-sm tracking-[0.3em] uppercase">
                        Traditional Chinese Lacquerware & Premium Crystal
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { title: '大漆 (Daqi)', color: 'from-[#8A3324] to-[#5C2E0A]', icon: '💮' },
                        { title: '點翠 (Cloisonné)', color: 'from-[#2A9D8F] to-[#1A5D54]', icon: '💠' },
                        { title: '古金 (Gold)', color: 'from-[#C5A065] to-[#8A6E3E]', icon: '✨' },
                        { title: '白晶 (Crystal)', color: 'from-[#E0E0E0] to-[#FFFFFF] via-[#F0F8FF]', icon: '💎' },
                    ].map((item, i) => (
                        <div key={i} className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer">
                            {/* Texture Background Placeholder */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transition-transform duration-700 group-hover:scale-110`}>
                                {/* Noise Texture Overlay */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-black/10 group-hover:bg-black/30 transition-colors">
                                <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{item.icon}</span>
                                <h3 className="font-serif text-lg font-bold tracking-widest">{item.title}</h3>
                                <div className="w-8 h-[1px] bg-white/50 mt-2 group-hover:w-16 transition-all"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
