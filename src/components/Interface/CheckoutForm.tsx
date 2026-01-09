'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface CheckoutFormProps {
    total: string
    onConfirm: (info: CustomerInfo) => void
    onCancel: () => void
}

export interface CustomerInfo {
    name: string
    phone: string
    address: string
}

export function CheckoutForm({ total, onConfirm, onCancel }: CheckoutFormProps) {
    const [info, setInfo] = useState<CustomerInfo>({
        name: '',
        phone: '',
        address: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onConfirm(info)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onCancel}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-[#F9F7F2] rounded-2xl shadow-2xl p-8 border border-[#D4AF37]/20"
            >
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-[#2B2B2B]/40 hover:text-[#C04035] transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-8">
                    <h2 className="font-serif text-2xl text-[#2B2B2B] mb-2">Order Details</h2>
                    <p className="text-sm text-[#2B2B2B]/60 tracking-wider uppercase">
                        Total: <span className="text-[#C04035] font-bold">{total}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-[#2B2B2B]/60">Name</label>
                        <input
                            required
                            type="text"
                            value={info.name}
                            onChange={e => setInfo({ ...info, name: e.target.value })}
                            className="w-full bg-white/50 border-b border-[#2B2B2B]/20 py-2 px-3 focus:outline-none focus:border-[#C04035] transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-[#2B2B2B]/60">Phone</label>
                        <input
                            required
                            type="tel"
                            value={info.phone}
                            onChange={e => setInfo({ ...info, phone: e.target.value })}
                            className="w-full bg-white/50 border-b border-[#2B2B2B]/20 py-2 px-3 focus:outline-none focus:border-[#C04035] transition-colors"
                            placeholder="Mobile Number"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-[#2B2B2B]/60">Address</label>
                        <textarea
                            required
                            rows={3}
                            value={info.address}
                            onChange={e => setInfo({ ...info, address: e.target.value })}
                            className="w-full bg-white/50 border-b border-[#2B2B2B]/20 py-2 px-3 focus:outline-none focus:border-[#C04035] transition-colors resize-none"
                            placeholder="Delivery Address"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-[#2B2B2B] text-[#F9F7F2] text-sm tracking-[0.2em] uppercase font-bold rounded-sm hover:bg-[#404040] transition-all transform hover:-translate-y-1 shadow-lg mt-8"
                    >
                        Confirm Order
                    </button>
                </form>

                {/* Decorative Seal */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-[#C04035]/10 rounded-full flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 border border-[#C04035]/10 rounded-full" />
                </div>
            </motion.div>
        </div>
    )
}
