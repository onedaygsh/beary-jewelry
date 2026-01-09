'use client'

import React from 'react'
import { useSkus } from '@/hooks/useSkus'
import { useCurrency } from '@/hooks/useCurrency'
import { useLocale } from 'next-intl'
import { BeadSku } from '@/data/skus'

export default function AdminInventory() {
    const { skus, isLoading } = useSkus()
    const { formatPrice } = useCurrency()
    const locale = useLocale()

    const getName = (sku: BeadSku) => {
        if (typeof sku.name === 'string') return sku.name
        return (sku.name as any)[locale] || sku.name['en']
    }

    const getPrice = (sku: BeadSku) => {
        if (typeof sku.price === 'number') return sku.price
        return sku.price.base
    }

    if (isLoading) return <div className="p-8 text-gray-500">Loading inventory...</div>

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-bold text-gray-800">Product Inventory</h3>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{skus.length} Items</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs uppercase text-gray-400 tracking-wider">
                            <th className="px-6 py-4 font-medium">SKU ID</th>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium text-right">Base (USD)</th>
                            <th className="px-6 py-4 font-medium text-right">Local Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {skus.map((sku) => (
                            <tr key={sku.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 text-sm font-mono text-indigo-600">{sku.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: sku.color }} />
                                        <span className="text-sm font-medium text-gray-700">{getName(sku)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 text-right font-sans">
                                    ${getPrice(sku)}
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right font-sans">
                                    {formatPrice(getPrice(sku))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
