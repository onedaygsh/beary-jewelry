'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'
import { X, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CartDrawer() {
    const { isOpen, items, toggleCart, removeFromCart } = useCartStore()

    const cartTotal = items.reduce((acc, item) => acc + item.totalPrice, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => toggleCart(false)}
                        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F5F1E8] shadow-2xl z-[70] flex flex-col border-l border-[#D4AF37]/20"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-[#4A4036]/10">
                            <h2 className="font-serif text-2xl text-[#4A4036]">Your Bag ({items.length})</h2>
                            <button onClick={() => toggleCart(false)} className="p-2 hover:bg-[#4A4036]/5 rounded-full">
                                <X size={24} className="text-[#4A4036]" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-50 space-y-4">
                                    <span className="font-serif italic text-xl">Your bag is empty</span>
                                    <button onClick={() => toggleCart(false)} className="text-xs uppercase tracking-widest border-b border-[#4A4036]">Keep Designing</button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.cartId} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#D4AF37]/10 relative group">
                                        {/* Thumbnail (Mock) */}
                                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                            Preview
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-serif font-bold text-[#4A4036]">Custom Bracelet</h3>
                                            <p className="text-xs text-[#4A4036]/60 mt-1">
                                                {item.beads.length} Beads · {16}cm
                                            </p>
                                            <p className="text-lg font-mono mt-2">${item.totalPrice}</p>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white border-t border-[#4A4036]/10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm uppercase tracking-widest text-[#4A4036]/60">Subtotal</span>
                                    <span className="text-2xl font-serif text-[#4A4036]">${cartTotal}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={() => toggleCart(false)}
                                    className="w-full bg-[#D4AF37] text-white py-4 rounded-full flex items-center justify-center gap-2 font-bold tracking-widest hover:bg-[#C5A028] transition-colors shadow-lg shadow-[#D4AF37]/30"
                                >
                                    CHECKOUT <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
