'use client'

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import AdminInventory from '@/components/admin/AdminInventory'

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'admin123') {
            setIsAuthenticated(true)
            setError(false)
        } else {
            setError(true)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="p-3 bg-gray-100 rounded-full text-gray-500">
                            <Lock size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
                        <p className="text-gray-500 text-sm">Please enter your password to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError(false)
                                }}
                                className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-indigo-100 focus:border-indigo-500'} focus:ring-4 focus:outline-none transition-all outline-none bg-gray-50`}
                                placeholder="Enter password (admin123)"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-xs mt-2 ml-1">Incorrect password</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-200"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                    <p className="text-gray-500 mt-1">Manage your SKU data and localized pricing.</p>
                </div>
                <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    Currency Sync: Active
                </div>
            </header>

            <AdminInventory />
        </div>
    )
}
