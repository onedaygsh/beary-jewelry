import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Bead } from './useBraceletStore'

export interface CartItem {
    cartId: string
    designId?: string // Optional, if saved to DB
    beads: Bead[]
    totalPrice: number
    addedAt: number
}

interface CartState {
    isOpen: boolean
    items: CartItem[]

    // Actions
    toggleCart: (isOpen?: boolean) => void
    addToCart: (beads: Bead[], price: number) => void
    removeFromCart: (cartId: string) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>()(
    immer((set) => ({
        isOpen: false,
        items: [],

        toggleCart: (isOpen) => set((state) => {
            state.isOpen = isOpen ?? !state.isOpen
        }),

        addToCart: (beads, price) => set((state) => {
            // Snapshot Logic: Deep clone beads to prevent reference mutations
            const snapshotBeads = JSON.parse(JSON.stringify(beads))

            state.items.push({
                cartId: Math.random().toString(36).substring(7),
                beads: snapshotBeads,
                totalPrice: price,
                addedAt: Date.now()
            })

            // Auto open cart
            state.isOpen = true
        }),

        removeFromCart: (cartId) => set((state) => {
            const index = state.items.findIndex(i => i.cartId === cartId)
            if (index !== -1) {
                state.items.splice(index, 1)
            }
        }),

        clearCart: () => set((state) => {
            state.items = []
        })
    }))
)
