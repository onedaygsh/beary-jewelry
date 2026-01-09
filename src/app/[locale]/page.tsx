'use client'

import React from 'react'
import DIYConfigurator from '@/components/configurator/DIYConfigurator'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] selection:bg-[#D4AF37] selection:text-white">

      {/* Navbar (Simplified for this demo) */}
      <nav className="fixed top-0 left-0 w-full py-6 px-8 z-50 flex justify-between items-center mix-blend-multiply">
        <span className="font-serif text-2xl font-bold text-[#4A4036] tracking-widest">BEA&RY</span>
        <button className="text-[#4A4036] font-bold text-sm tracking-widest border-b border-[#4A4036] border-opacity-30 pb-1">MENU</button>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

        {/* Left: Interactive Configurator Layer */}
        <div className="lg:col-span-7 h-[60vh] lg:h-screen relative p-4 lg:p-8 flex items-center justify-center order-2 lg:order-1">
          <div className="w-full h-full max-w-[800px] max-h-[900px]">
            <DIYConfigurator />
          </div>
        </div>

        {/* Right: Narrative & Brand Layer */}
        <div className="lg:col-span-5 flex flex-col justify-center px-8 lg:px-20 py-20 lg:py-0 order-1 lg:order-2 space-y-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] text-sm font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
              Premium Collection
            </h2>
            <h1 className="font-serif text-6xl lg:text-7xl text-[#4A4036] leading-[1.1] mb-8">
              串連你的<br />
              <span className="italic opacity-80">独家记忆</span>
            </h1>
            <p className="text-[#4A4036]/70 text-lg leading-relaxed max-w-md font-light">
              每一颗珠子都承载着一段故事。BEA&RY 邀您亲手设计，将珍贵瞬间凝聚于腕间，打造只属于您的永恒印记。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-8 border-t border-[#4A4036]/10 pt-8">
              <div>
                <p className="text-3xl font-serif text-[#4A4036]">12k+</p>
                <p className="text-xs uppercase tracking-widest opacity-50 mt-1">Unique Designs</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#4A4036]">4.9</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} fill="#D4AF37" stroke="none" />
                  <Star size={12} fill="#D4AF37" stroke="none" />
                  <Star size={12} fill="#D4AF37" stroke="none" />
                  <Star size={12} fill="#D4AF37" stroke="none" />
                  <Star size={12} fill="#D4AF37" stroke="none" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Inspiration Gallery (Below Fold) */}
      <section className="py-24 px-8 border-t border-[#4A4036]/5">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h3 className="font-serif text-4xl text-[#4A4036]">Inspiration Gallery</h3>
            <a href="#" className="text-[#D4AF37] flex items-center gap-2 text-sm font-bold tracking-widest hover:opacity-80 transition-opacity">
              VIEW ALL <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow cursor-pointer relative group">
                <div className="absolute inset-0 bg-[#F5F1E8] mix-blend-multiply opacity-20"></div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <p className="font-serif text-[#4A4036] text-lg">Summer Breeze</p>
                  <p className="text-xs uppercase tracking-widest opacity-50">by @Designer{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
