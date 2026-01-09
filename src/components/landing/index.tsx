'use client'

import { useAdmin } from '@/context/AdminContext'

import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, User } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/utils/animations'
import { PremiumLoader } from '@/components/ui/PremiumLoader'
import { useLocale } from 'next-intl'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
    ssr: false,
    loading: () => <PremiumLoader />
})

// Navbar: Large Luxury Header
export function Navbar() {
    const locale = useLocale()
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[#D4AF37]/20 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md text-[#2B2B2B] py-4'
                : 'bg-[#151515] text-[#F9F7F2] py-5' // Further reduced
                }`}
        >
            <div className="container-custom flex justify-between items-center relative h-full">

                {/* Left: Navigation Links - Larger text */}
                <div className="hidden lg:flex gap-16 text-xl tracking-[0.4em] font-serif font-bold">
                    {['首頁', '甄選', 'DIY 套組'].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="hover:text-[#D4AF37] transition-all hover:-translate-y-1 block"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Center: Brand Logo - Maximum Impact */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group">
                    <Link href="/" aria-label="Lumina Loop Home">
                        <span className="font-serif text-5xl md:text-9xl tracking-[0.2em] md:tracking-[0.4em] font-extrabold text-white group-hover:text-[#D4AF37] transition-colors block">
                            LUMINA
                        </span>
                    </Link>
                </div>

                {/* Right: Utility & Extra Links */}
                <div className="hidden lg:flex items-center gap-12 text-xl font-serif font-bold tracking-[0.4em]">
                    <div className="flex gap-16">
                        {['品牌故事', '工藝流程'].map((item) => (
                            <Link key={item} href="#" className="hover:text-[#D4AF37] transition-all hover:-translate-y-1 block">{item}</Link>
                        ))}
                    </div>
                    <div className="w-[1px] h-10 bg-white/20"></div>
                    <div className="flex gap-10">
                        <Link href={`/${locale}/login`} className="hover:text-[#D4AF37] transition-colors block">
                            <User size={34} />
                        </Link>
                        <button className="hover:text-[#D4AF37] transition-colors block">
                            <ShoppingBag size={34} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// Hero: Full Screen Immersive Layout
export function Hero() {
    const { config } = useAdmin()

    return (
        <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#1a1a1a]">

            {/* Background: 3D Scene (Absolute Fill) */}
            {config.hero.show3D && (
                <div className="absolute inset-0 z-0 opacity-100">
                    <HeroCanvas />
                </div>
            )}

            {/* Center Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center max-w-[1000px] px-6 mt-[-5vh]"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <div className="space-y-6 mb-12">
                    <motion.h2
                        className="text-[#D4AF37] text-sm md:text-base tracking-[0.6em] uppercase font-bold"
                        variants={fadeUp}
                    >
                        {config.hero.subtitle}
                    </motion.h2>
                    <motion.div variants={fadeUp}>
                        <h1
                            className="h1-hero text-white drop-shadow-2xl"
                            dangerouslySetInnerHTML={{ __html: config.hero.title }}
                        />
                    </motion.div>
                </div>

                <motion.div variants={fadeUp}>
                    <button
                        onClick={() => document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-gold"
                        aria-label={config.hero.buttonText}
                    >
                        {config.hero.buttonText}
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 opacity-50"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
            </motion.div>
        </section>
    )
}

export function Showcase() {
    return (
        <section className="py-20 md:py-32 bg-[#F9F7F2]">
            <div className="container-custom">
                {/* Horizontal Layout Container - CSS Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center place-items-center">

                    {/* Feature 1: SD 模拟 */}
                    <motion.div
                        className="flex flex-col items-center gap-6 group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-16 h-16 relative text-[#4A4A4A] group-hover:text-[#C8A97E] transition-colors duration-500">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full" aria-hidden="true">
                                <path d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" />
                                <path d="M50 5 L50 50 L95 27.5" />
                                <path d="M50 50 L5 27.5" />
                                <path d="M50 50 L50 95" />
                            </svg>
                        </div>
                        <div className="space-y-3">
                            <h3 className="h3-card">
                                SD 模擬
                            </h3>
                            <p className="text-body max-w-[220px] mx-auto">
                                高精度 3D 渲染<br />還原真實光影
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 2: 甄选材质 */}
                    <motion.div
                        className="flex flex-col items-center gap-6 group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="w-16 h-16 relative text-[#4A4A4A] group-hover:text-[#C8A97E] transition-colors duration-500">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                                <path d="M50 5 C60 5, 65 15, 75 15 C85 15, 90 25, 90 35 C90 45, 80 50, 80 60 C80 70, 90 75, 85 85 C80 95, 70 90, 60 90 C50 90, 45 80, 35 80 C25 80, 20 90, 10 85 C0 80, 10 70, 10 60 C10 50, 0 45, 5 35 C10 25, 20 20, 25 15 C30 10, 40 5, 50 5 Z" />
                                <circle cx="50" cy="50" r="20" strokeWidth="1" opacity="0.5" />
                            </svg>
                        </div>
                        <div className="space-y-3">
                            <h3 className="h3-card">
                                甄選材質
                            </h3>
                            <p className="text-body max-w-[220px] mx-auto">
                                嚴選全球礦石<br />保證頂級品質
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 3: DIY 套组 */}
                    <motion.div
                        className="flex flex-col items-center gap-6 group cursor-pointer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="w-16 h-16 relative text-[#4A4A4A] group-hover:text-[#C8A97E] transition-colors duration-500">
                            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                                <path d="M30 70 L15 85 C10 90, 10 90, 15 95 C20 100, 20 100, 25 95 L40 80" />
                                <path d="M35 75 L60 50" />
                                <path d="M60 50 C55 35, 60 20, 75 10 C85 5, 95 5, 95 5 C95 5, 95 15, 90 25 C80 40, 65 45, 60 50" />
                                <circle cx="75" cy="25" r="5" />
                            </svg>
                        </div>
                        <div className="space-y-3">
                            <h3 className="h3-card">
                                DIY 套組
                            </h3>
                            <p className="text-body max-w-[220px] mx-auto">
                                專業工具支持<br />輕鬆享受創作
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export function Community() {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="container-custom flex flex-col items-center">
                <h2 className="h2-section mb-12">甄選系列</h2>

                {/* Product Grid - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16">
                    {[
                        { name: '紫韻 · 碧璽', price: '¥ 12,800', color: '#E6E6FA' },
                        { name: '雅玉 · 翡翠', price: '¥ 28,800', color: '#F0FFF0' },
                        { name: '流光 · 鑽石', price: '¥ 58,800', color: '#F5F5F5' }
                    ].map((product, i) => (
                        <div
                            key={i}
                            className="group cursor-pointer"
                        >
                            {/* Card Image */}
                            <div className="aspect-[4/5] bg-[#F5F5F0] relative overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2">
                                <div className="absolute inset-0 bg-neutral-200 animate-pulse opacity-20"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-[#4A4A4A]/20 font-serif tracking-widest text-lg">
                                    PRODUCT IMAGE
                                </div>

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Card Info */}
                            <div className="text-center space-y-2">
                                <h3 className="h3-card !text-xl group-hover:text-[#C8A97E] transition-colors">{product.name}</h3>
                                <p className="text-body font-medium !text-[#4A4A4A]">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="px-12 py-3 border-b border-[#4A4A4A] text-[#4A4A4A] text-sm tracking-[0.2em] hover:text-[#C8A97E] hover:border-[#C8A97E] transition-all duration-300 uppercase">
                        查看完整系列
                    </button>
                </div>
            </div>
        </section>
    )
}

export function Footer() {
    return (
        <footer className="bg-[#1a1a1a] py-8 border-t border-gray-800">
            <div className="container mx-auto px-4">
                {/* 四欄布局 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* 品牌名稱 */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border border-[#F9F7F2] rounded-full flex items-center justify-center">
                                <span className="font-serif text-xs font-bold tracking-widest text-[#F9F7F2]">流光</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-lg tracking-wide font-bold text-[#F9F7F2]">流光 · 漆藝</span>
                                <span className="text-[0.5rem] tracking-widest uppercase text-[#F9F7F2]/60">Lumina Loop</span>
                            </div>
                        </div>
                        <p className="text-sm text-[#F9F7F2]/60 leading-relaxed">
                            傳承東方工藝，創造時光之美
                        </p>
                    </div>

                    {/* 服務中心 */}
                    <div>
                        <h4 className="text-[#F9F7F2] font-medium mb-4 text-sm tracking-wide">服務中心</h4>
                        <ul className="space-y-3">
                            {['訂單查詢', '配送信息', '退換貨政策', '常見問題'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#F9F7F2]/60 hover:text-[#D4AF37] transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 我們的信息 */}
                    <div>
                        <h4 className="text-[#F9F7F2] font-medium mb-4 text-sm tracking-wide">我們的信息</h4>
                        <ul className="space-y-3">
                            {['關於我們', '品牌故事', '工藝介紹', '聯繫我們'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#F9F7F2]/60 hover:text-[#D4AF37] transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 訂閱表單 */}
                    <div>
                        <h4 className="text-[#F9F7F2] font-medium mb-4 text-sm tracking-wide">訂閱我們</h4>
                        <p className="text-[#F9F7F2]/60 text-sm mb-4">
                            獲取最新產品和優惠信息
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="您的郵箱"
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-[#F9F7F2] text-sm placeholder:text-[#F9F7F2]/40 focus:outline-none focus:border-[#D4AF37]"
                            />
                            <button className="px-6 py-2 bg-[#C04035] hover:bg-[#a03529] text-white rounded-lg transition-colors text-sm font-medium">
                                訂閱
                            </button>
                        </div>
                    </div>
                </div>

                {/* 分隔線 */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* 版權信息 */}
                        <p className="text-[#F9F7F2]/40 text-xs">
                            Copyright © 2025 Lumina Loop. All rights reserved.
                        </p>

                        {/* 社交媒體圖標 */}
                        <div className="flex gap-4">
                            {['微信', 'Instagram', 'Facebook'].map((platform) => (
                                <a
                                    key={platform}
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-colors group"
                                >
                                    <span className="text-[#F9F7F2]/60 group-hover:text-white text-xs">
                                        {platform[0]}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
