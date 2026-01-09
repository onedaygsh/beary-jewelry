import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Store } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-100 font-sans text-slate-800">
            {/* Admin Navigation */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                            <LayoutDashboard size={20} />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Lumina Admin</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Link href="/en/admin" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-md hover:bg-gray-50 transition-colors">Inventory</Link>
                        <Link href="/en/admin/cms" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-md hover:bg-gray-50 transition-colors">Visual Editor</Link>
                    </div>
                </div>

                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
                >
                    <Store size={16} />
                    View Storefront
                </Link>
            </nav>

            {/* Main Content Area */}
            <main className="p-6 md:p-10 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    )
}
