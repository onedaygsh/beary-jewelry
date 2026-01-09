'use client'

import React from 'react'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/utils/animations'

export function ProcessSteps() {
    const features = [
        {
            title: '3D 模擬',
            subtitle: '3D Simulation',
            description: '珠鍊可選材質3D模擬，逼還原你的3D預想',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12L20 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12L4 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: '甄選材質',
            subtitle: 'Premium Materials',
            description: '為您精選真材實料礦物特質，精選低品質的材質',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9 16.5L15 7.5" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            )
        },
        {
            title: 'DIY 套組',
            subtitle: 'DIY Kit',
            description: 'DIY 套組發售，可以體驗我們DIY樂趣',
            icon: (
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M15 4L5 14L8 17L19 6L15 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M11 20H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            )
        }
    ]

    return (
        <section className="py-16 md:py-20 bg-[#F2F0E9] text-[#4A4A4A]">
            <div className="container mx-auto px-8">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex flex-col items-center text-center space-y-8 group">
                        <div className="w-20 h-20 mb-6 text-[#4A4A4A] opacity-80 group-hover:text-[#C8A97E] transition-colors duration-300">
                            {/* Cube Icon for SD Simulation */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif font-bold tracking-[0.2em] text-[#4A4A4A]">
                            SD 模擬
                        </h3>
                        <p className="text-[#4A4A4A]/60 text-sm tracking-wide leading-loose max-w-[240px]">
                            高精度 3D 渲染，還原真實光影與材質質感
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-8 group">
                        <div className="w-20 h-20 mb-6 text-[#4A4A4A] opacity-80 group-hover:text-[#C8A97E] transition-colors duration-300">
                            {/* Badge Icon for Premium Materials */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.74z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif font-bold tracking-[0.2em] text-[#4A4A4A]">
                            甄選材質
                        </h3>
                        <p className="text-[#4A4A4A]/60 text-sm tracking-wide leading-loose max-w-[240px]">
                            嚴選大漆、水晶與天然礦石，保證頂級品質
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-8 group">
                        <div className="w-20 h-20 mb-6 text-[#4A4A4A] opacity-80 group-hover:text-[#C8A97E] transition-colors duration-300">
                            {/* Tools Icon for DIY Kit */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="w-full h-full">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif font-bold tracking-[0.2em] text-[#4A4A4A]">
                            DIY 套組
                        </h3>
                        <p className="text-[#4A4A4A]/60 text-sm tracking-wide leading-loose max-w-[240px]">
                            包含所有配件與工具，輕鬆享受創作樂趣
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
