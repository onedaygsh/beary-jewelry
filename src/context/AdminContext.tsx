'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define the shape of our CMS data
interface StorefrontConfig {
    hero: {
        title: string
        subtitle: string
        buttonText: string
        show3D: boolean
    }
    showcase: {
        features: {
            sd: boolean // SD Simulation
            materials: boolean // Premium Materials
            diy: boolean // DIY Kit
        }
    }
}

// Default Configuration
const defaultConfig: StorefrontConfig = {
    hero: {
        title: '串連你的<br />獨立記憶',
        subtitle: 'Lumina Loop Collection',
        buttonText: '立即開始',
        show3D: true
    },
    showcase: {
        features: {
            sd: true,
            materials: true,
            diy: true
        }
    }
}

interface AdminContextType {
    config: StorefrontConfig
    updateConfig: (newConfig: Partial<StorefrontConfig>) => void
    updateHeroConfig: (updates: Partial<StorefrontConfig['hero']>) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
    // In a real app, this would come from a database. 
    // For now, we initialize from localStorage or default.
    const [config, setConfig] = useState<StorefrontConfig>(defaultConfig)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('lumina_storefront_config')
        if (saved) {
            try {
                setConfig(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse config', e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage whenever config changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('lumina_storefront_config', JSON.stringify(config))
        }
    }, [config, isLoaded])

    const updateConfig = (newConfig: Partial<StorefrontConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }))
    }

    const updateHeroConfig = (updates: Partial<StorefrontConfig['hero']>) => {
        setConfig(prev => ({
            ...prev,
            hero: { ...prev.hero, ...updates }
        }))
    }

    // Don't render until loaded to avoid hydration mismatch
    if (!isLoaded) return null

    return (
        <AdminContext.Provider value={{ config, updateConfig, updateHeroConfig }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider')
    }
    return context
}
