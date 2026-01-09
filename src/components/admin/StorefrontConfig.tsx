'use client'

import React from 'react'
import { useAdmin } from '@/context/AdminContext'
import { Type, Layout, Eye, Save } from 'lucide-react'

export default function StorefrontConfig() {
    const { config, updateHeroConfig } = useAdmin()
    const [localHero, setLocalHero] = React.useState(config.hero)
    const [isDirty, setIsDirty] = React.useState(false)

    // Sync local state when config changes (e.g. initial load)
    React.useEffect(() => {
        setLocalHero(config.hero)
    }, [config.hero])

    const handleChange = (field: keyof typeof config.hero, value: any) => {
        setLocalHero(prev => ({ ...prev, [field]: value }))
        setIsDirty(true)
    }

    const handleSave = () => {
        updateHeroConfig(localHero)
        setIsDirty(false)
        // Ideally show a toast notification here
        alert('Configuration Saved!')
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Storefront Visual Editor</h2>
                    <p className="text-gray-500">Customize the appearance and content of your landing page.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isDirty
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hero Configuration Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Type size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Hero Content</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Main Headline (HTML allowed)</label>
                            <textarea
                                value={localHero.title}
                                onChange={e => handleChange('title', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none h-24 font-mono text-sm"
                                placeholder="<h1>Title</h1>"
                            />
                            <p className="text-xs text-gray-400 mt-1">Supports {'<br />'} for line breaks.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={localHero.subtitle}
                                onChange={e => handleChange('subtitle', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                            <input
                                type="text"
                                value={localHero.buttonText}
                                onChange={e => handleChange('buttonText', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Display Options Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Layout size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Display Options</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Eye size={18} className="text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Show 3D Background</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={localHero.show3D}
                                    onChange={e => handleChange('show3D', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Preview Hint */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between text-blue-800 text-sm">
                <p>💡 Tip: Open the store in a new tab to see your changes live after saving.</p>
                <a href="/" target="_blank" className="font-bold underline hover:no-underline">Go to Storefront &rarr;</a>
            </div>
        </div>
    )
}
