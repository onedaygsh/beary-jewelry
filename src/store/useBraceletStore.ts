import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// --- Types ---
export interface Bead {
    id: string
    type: 'pearl' | 'gemstone' | 'metal' | 'letter'
    value: string
    price: number
    color: string
    texture: string
    width?: number // mm
}

export interface BraceletConfig {
    beads: Bead[]
    circumference: number // mm (Renamed/Added per request)
    totalPrice: number
}

interface BraceletState extends BraceletConfig {
    // Actions
    addBead: (bead: Omit<Bead, 'id'>) => void
    removeBead: (index: number) => void
    updateOrder: (fromIndex: number, toIndex: number) => void
    loadConfiguration: (beads: Bead[]) => void
    reset: () => void
}

// --- Constants ---
const BASE_PRICE = 299
const MAX_BEADS = 24
const BEAD_WIDTH_AVG = 12 // mm

// --- Helper ---
const calculateTotal = (beads: Bead[]) => {
    return BASE_PRICE + beads.reduce((acc, bead) => acc + bead.price, 0)
}

const calculateCircumference = (beads: Bead[]) => {
    // Simple logic: Base string + beads width
    // Or just count * width
    // For now: 160mm base + added beads
    return 160 + (beads.length * (BEAD_WIDTH_AVG / 3)) // Mock calculation
}

// --- Store ---
export const useBraceletStore = create<BraceletState>()(
    immer((set) => ({
        beads: [],
        circumference: 160,
        totalPrice: BASE_PRICE,

        addBead: (beadParams) => set((state) => {
            if (state.beads.length >= MAX_BEADS) return

            const newBead = {
                ...beadParams,
                id: Math.random().toString(36).substring(7)
            }

            state.beads.push(newBead)
            state.totalPrice = calculateTotal(state.beads)
            state.circumference = calculateCircumference(state.beads)
        }),

        removeBead: (index) => set((state) => {
            if (index < 0 || index >= state.beads.length) return
            state.beads.splice(index, 1)
            state.totalPrice = calculateTotal(state.beads)
            state.circumference = calculateCircumference(state.beads)
        }),

        updateOrder: (fromIndex, toIndex) => set((state) => {
            if (fromIndex === toIndex) return
            const [movedItem] = state.beads.splice(fromIndex, 1)
            state.beads.splice(toIndex, 0, movedItem)
        }),

        loadConfiguration: (newBeads) => set((state) => {
            state.beads = JSON.parse(JSON.stringify(newBeads))
            state.totalPrice = calculateTotal(state.beads)
            state.circumference = calculateCircumference(state.beads)
        }),

        reset: () => set((state) => {
            state.beads = []
            state.totalPrice = BASE_PRICE
            state.circumference = 160
        })
    }))
)
