import { create } from 'zustand'

export interface Bead {
    id: string
    type: 'pearl' | 'gemstone' | 'letter'
    textureUrl: string
    price: number
    width: number // mm
}

interface BraceletState {
    beads: Bead[]
    totalPrice: number
    circumference: number // mm

    // Actions
    addBead: (bead: Omit<Bead, 'id'>) => void
    removeBead: (id: string) => void
    reset: () => void
}

const BASE_PRICE = 599 // Base chain price
const BASE_CIRCUMFERENCE = 160 // Base length in mm

export const useConfiguratorStore = create<BraceletState>((set) => ({
    beads: [],
    totalPrice: BASE_PRICE,
    circumference: BASE_CIRCUMFERENCE,

    addBead: (beadParams) => set((state) => {
        const newBead = { ...beadParams, id: Math.random().toString(36).substring(7) }
        const nextBeads = [...state.beads, newBead]

        return {
            beads: nextBeads,
            totalPrice: state.totalPrice + newBead.price,
            circumference: state.circumference + newBead.width
        }
    }),

    removeBead: (id) => set((state) => {
        const targetBead = state.beads.find(b => b.id === id)
        if (!targetBead) return state

        const nextBeads = state.beads.filter(b => b.id !== id)

        return {
            beads: nextBeads,
            totalPrice: state.totalPrice - targetBead.price,
            circumference: state.circumference - targetBead.width
        }
    }),

    reset: () => set({
        beads: [],
        totalPrice: BASE_PRICE,
        circumference: BASE_CIRCUMFERENCE
    })
}))
