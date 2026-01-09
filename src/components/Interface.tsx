'use client'

import React, { useState, useMemo } from 'react'
import { BeadSku } from '@/data/skus'
import { useStore } from '@/store/useStore'
import { ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useCurrency } from '@/hooks/useCurrency'
import { Palette } from './Interface/Palette'
import { CheckoutForm, CustomerInfo } from './Interface/CheckoutForm'

export default function Interface() {
    const t = useTranslations('General')
    const locale = useLocale()
    const { formatPrice, code: currencyCode } = useCurrency()

    // palette logic moved to Palette component
    const beads = useStore((state) => state.beads)
    const skuDefs = useStore(state => state.skuDefs)
    const addBead = useStore(state => state.addBead)

    // Initial Population
    React.useEffect(() => {
        if (beads.length === 0 && Object.keys(skuDefs).length > 0) {
            const keys = Object.keys(skuDefs)
            // Add a pleasing pattern of default beads
            // Try to find specific ones if possible, else random
            const gem = keys.find(k => skuDefs[k].materialType === 'gem') || keys[0]
            const metal = keys.find(k => skuDefs[k].materialType === 'metal') || keys[1] || keys[0]

            addBead(gem, 0.1)
            addBead(metal, 0.25)
            addBead(gem, 0.4)
            addBead(metal, 0.55)
            addBead(gem, 0.7)
            addBead(metal, 0.85) // Spread out
        }
    }, [skuDefs, beads.length, addBead])

    const [showBom, setShowBom] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null)

    // Helper to get specialized name (still needed for BOM?) -> Yes
    const getName = (sku: BeadSku) => {
        if (typeof sku.name === 'string') return sku.name
        return (sku.name as any)[locale] || sku.name['en']
    }

    // Helper to get price value
    const getPrice = (sku: BeadSku) => {
        if (typeof sku.price === 'number') return sku.price
        return sku.price.base
    }

    // Stable Selector Logic (Memoized locally)
    const { totalPrice, bom } = useMemo(() => {
        let price = 15 // Base string cost
        const counts: Record<string, number> = {}

        beads.forEach(b => {
            const sku = skuDefs[b.skuId]
            if (sku) {
                const p = getPrice(sku)
                price += p
                const n = getName(sku)
                counts[n] = (counts[n] || 0) + 1
            }
        })

        return { totalPrice: parseFloat(price.toFixed(2)), bom: counts }
    }, [beads, skuDefs, locale])

    const onConfirmCheckout = async (info: CustomerInfo) => {
        setIsCheckingOut(true)
        setCheckoutMessage(null)

        try {
            const payload = {
                customer: info,
                items: bom,
                baseTotal: totalPrice,
                userLocale: locale,
                currency: currencyCode,
                displayTotal: formatPrice(totalPrice),
                timestamp: new Date().toISOString()
            }

            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

            if (!webhookUrl) {
                throw new Error('Webhook URL not configured')
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error(`Checkout failed: ${response.statusText}`)
            }

            setCheckoutMessage('success')
            setShowCheckout(false)
            // Optionally clear the cart after successful checkout
            // useStore.getState().clearBeads()
        } catch (error) {
            console.error('Checkout error:', error)
            setCheckoutMessage('error')
        } finally {
            setIsCheckingOut(false)
            // Auto-hide message after 3 seconds
            setTimeout(() => setCheckoutMessage(null), 3000)
        }
    }

    const handleCheckoutClick = () => {
        setShowCheckout(true)
    }

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
            {/* Left Palette - Modern Floating Sidebar */}
            <Palette />

            {/* Price & Action Bar (Bottom Right) */}
            <div className="absolute bottom-8 right-8 pointer-events-auto flex flex-col items-end gap-4">
                <div className="bg-[#2B2B2B] text-[#F9F7F2] px-8 py-4 rounded-full shadow-2xl flex items-center gap-6 group hover:bg-[#1a1a1a] transition-colors cursor-pointer" onClick={() => setShowBom(!showBom)}>
                    <div>
                        <p className="text-[10px] opacity-60 uppercase tracking-[0.2em] mb-1">{t('total')}</p>
                        <p className="font-serif text-2xl tracking-widest">{formatPrice(totalPrice)}</p>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <ShoppingBag className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>

                <button
                    onClick={handleCheckoutClick}
                    className="bg-[#C04035] text-[#F9F7F2] px-8 py-3 rounded-full shadow-lg font-bold tracking-widest text-xs uppercase hover:bg-[#A03030] transition-colors"
                >
                    {t('checkout')}
                </button>
            </div>

            {/* Bill of Materials (BOM) Overlay */}
            {showBom && (
                <div className="absolute bottom-32 right-8 pointer-events-auto bg-[#F9F7F2]/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-[#D4AF37]/20 w-64 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <h3 className="font-serif text-[#2B2B2B] text-lg mb-4 flex items-center justify-between">
                        <span>清单</span>
                        <span className="text-xs font-sans text-[#2B2B2B]/50 uppercase tracking-widest">BOM</span>
                    </h3>

                    <ul className="space-y-3">
                        <li className="flex justify-between text-sm text-[#2B2B2B]/80 font-sans border-b border-black/5 pb-2">
                            <span>Base String</span>
                            <span>{formatPrice(15)}</span>
                        </li>
                        {Object.entries(bom).map(([name, count]) => (
                            <li key={name} className="flex justify-between text-sm text-[#2B2B2B]/80 font-sans border-b border-black/5 pb-2 last:border-0">
                                <span>{name} x{count}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Seal */}
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 border-2 border-[#C04035] opacity-20 rounded-full flex items-center justify-center rotate-[-15deg] pointer-events-none">
                        <span className="text-[#C04035] text-xs">李氏工坊</span>
                    </div>
                </div>
            )}

            {/* Title: Huge Vertical Watermark */}
            <h1 className="absolute top-10 left-32 text-[2rem] font-bold text-[#2B2B2B] opacity-10 writing-vertical tracking-[0.8em] pointer-events-auto select-none border-l-4 border-[#C04035]/20 pl-6 py-4 h-[400px]">
                {t('title')}
            </h1>

            <div className="absolute bottom-10 left-32 opacity-20">
                <p className="text-xs tracking-widest text-[#2B2B2B] writing-vertical h-32 border-l border-[#2B2B2B] pl-2">
                    {t('description')}
                </p>
            </div>

            {showCheckout && (
                <div className="pointer-events-auto">
                    <CheckoutForm
                        total={formatPrice(totalPrice)}
                        onConfirm={onConfirmCheckout}
                        onCancel={() => setShowCheckout(false)}
                    />
                </div>
            )}
        </div>
    )
}
