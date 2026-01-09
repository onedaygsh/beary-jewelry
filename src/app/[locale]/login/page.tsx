'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/utils/animations'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { User, Lock, Mail, ChevronRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const t = useTranslations('Auth')
    const [isLoading, setIsLoading] = useState(false)
    const { googleSignIn, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Bypass login for demonstration/dev purposes
        setTimeout(() => {
            setIsLoading(false)
            router.push('/')
        }, 1000)
    }

    const handleGoogleLogin = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F9F7F2]">
            {/* Left: Brand Section */}
            <motion.div
                className="w-full lg:w-1/2 relative min-h-[300px] lg:h-screen bg-[#1a1a1a] flex flex-col justify-center items-center text-center p-12 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a0404] via-[#1a0505] to-[#0a0a0a] opacity-90"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C04035] rounded-full blur-[150px] opacity-10 animate-pulse"></div>

                <motion.div
                    className="relative z-10 space-y-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={fadeUp}
                        className="w-20 h-20 border border-[#F9F7F2]/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm"
                    >
                        <span className="font-serif text-3xl font-bold text-[#F9F7F2]">流</span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl md:text-6xl font-serif text-[#F9F7F2] tracking-widest leading-tight"
                        >
                            LUMINA LOOP
                        </motion.h1>
                        <motion.div
                            variants={fadeUp}
                            className="w-16 h-[1px] bg-[#D4AF37] mx-auto"
                        ></motion.div>
                    </div>

                    <motion.p
                        variants={fadeUp}
                        className="text-[#F9F7F2]/60 text-sm tracking-[0.3em] uppercase max-w-sm mx-auto leading-relaxed"
                    >
                        Craft Your Story<br />Bead by Bead
                    </motion.p>
                </motion.div>
            </motion.div>

            {/* Right: Login Form */}
            <motion.div
                className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F9F7F2]"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="w-full max-w-[400px] mx-auto bg-white p-8 rounded-xl shadow-lg space-y-10 border border-gray-100">
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-serif text-[#2B2B2B]">{t('welcomeBack')}</h2>
                        <p className="text-gray-500 text-sm">{t('signInPrompt')}</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-6">
                            <div className="relative group">
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-[#C04035] transition-colors">
                                    {t('email')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b border-gray-300 py-3 pl-8 text-[#2B2B2B] focus:border-[#C04035] focus:outline-none transition-all placeholder:text-gray-300"
                                        placeholder="name@example.com"
                                    />
                                    <Mail className="absolute left-0 top-3 text-gray-400 w-5 h-5 group-focus-within:text-[#C04035] transition-colors" />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-[#C04035] transition-colors">
                                    {t('password')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full bg-transparent border-b border-gray-300 py-3 pl-8 text-[#2B2B2B] focus:border-[#C04035] focus:outline-none transition-all placeholder:text-gray-300"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-0 top-3 text-gray-400 w-5 h-5 group-focus-within:text-[#C04035] transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer w-4 h-4 border-gray-300 rounded text-[#C04035] focus:ring-[#C04035]" />
                                </div>
                                <span className="text-gray-500 group-hover:text-[#2B2B2B] transition-colors">{t('rememberMe')}</span>
                            </label>
                            <a href="#" className="text-gray-500 hover:text-[#C04035] transition-colors hover:underline">
                                {t('forgotPassword')}
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#2B2B2B] text-[#F9F7F2] py-4 rounded-sm tracking-[0.2em] uppercase text-xs font-bold hover:bg-[#404040] transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">{t('signingIn')}</span>
                            ) : (
                                <>
                                    <span>{t('signIn')}</span>
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                            <span className="bg-[#F9F7F2] px-4 text-gray-400">{t('orContinueWith')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-sm hover:bg-white hover:border-gray-300 hover:shadow-md transition-all group">
                            <span className="text-xl group-hover:scale-110 transition-transform">G</span>
                            <span className="text-xs text-gray-600">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-sm hover:bg-white hover:border-gray-300 hover:shadow-md transition-all group">
                            <span className="text-xl group-hover:scale-110 transition-transform">W</span>
                            <span className="text-xs text-gray-600">WeChat</span>
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-8">
                        {t('noAccount')}
                        <Link href="/register" className="text-[#C04035] font-bold ml-2 hover:underline tracking-wide">
                            {t('createAccount')}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
