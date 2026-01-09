import { create } from 'zustand'
import { braceletCurve } from '@/utils/braceletCurve'
import { BeadType, BeadSku } from '@/data/skus'

export interface Bead {
    id: string
    skuId: BeadType
    arcLengthOffset: number // Distance in World Units from start of curve
}

interface State {
    beads: Bead[]
    selectedBeadId: string | null
    skuDefs: Record<string, BeadSku>

    // Actions
    setSkuDefs: (defs: BeadSku[]) => void
    addBead: (skuId: BeadType, t: number) => void
    removeBead: (id: string) => void
    recalculatePositions: () => void
    selectBead: (id: string | null) => void

    // New
    activeGapIndex: number | null
    setActiveGapIndex: (index: number | null) => void
}

const TOTAL_LENGTH = braceletCurve.getLength()

// Helper: Solve collisions using dynamic defs
const solveCollisions = (beads: Bead[], skuDefs: Record<string, BeadSku>): Bead[] => {
    if (beads.length === 0) return []

    // 1. Sort by position
    const sorted = [...beads].sort((a, b) => a.arcLengthOffset - b.arcLengthOffset)

    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1]
        const curr = sorted[i]

        const prevSku = skuDefs[prev.skuId]
        const currSku = skuDefs[curr.skuId]

        if (!prevSku || !currSku) continue

        const prevRadius = prevSku.physicalWidth / 2
        const currRadius = currSku.physicalWidth / 2

        // Desired distance considering a small gap
        const minGap = 0.05 // 5% buffer
        const minDistance = prevRadius + currRadius + (prevRadius + currRadius) * minGap

        const currentDistance = curr.arcLengthOffset - prev.arcLengthOffset

        if (currentDistance < minDistance) {
            // Overlap detected! Push 'curr' forward
            curr.arcLengthOffset = prev.arcLengthOffset + minDistance
        }
    }

    return sorted
}

export const useStore = create<State>((set, get) => ({
    beads: [],
    selectedBeadId: null,
    skuDefs: {},
    activeGapIndex: null,

    setActiveGapIndex: (index) => set({ activeGapIndex: index }),

    setSkuDefs: (defsArray) => {
        const map: Record<string, BeadSku> = {}
        defsArray.forEach(sku => map[sku.id] = sku)
        set({ skuDefs: map })
    },

    addBead: (skuId, t) => {
        const { beads, skuDefs } = get()

        // Convert t to arc length
        let targetArcLength = t * TOTAL_LENGTH

        // Create new bead
        const newBead: Bead = {
            id: Math.random().toString(36).substring(2, 9),
            skuId,
            arcLengthOffset: targetArcLength
        }

        const newBeadList = [...beads, newBead]

        // Run Physics
        const solved = solveCollisions(newBeadList, skuDefs)

        set({ beads: solved })
    },

    removeBead: (id) =>
        set((state) => ({
            beads: state.beads.filter((b) => b.id !== id),
        })),

    recalculatePositions: () => {
        const { beads, skuDefs } = get()
        set({ beads: solveCollisions(beads, skuDefs) })
    },

    selectBead: (id) => set({ selectedBeadId: id })
}))


// Selectors
// Selectors
export const selectTotalPrice = (state: State) => {
    const beadsPrice = state.beads.reduce((acc, bead) => {
        const sku = state.skuDefs[bead.skuId]
        if (!sku) return acc
        const price = typeof sku.price === 'number' ? sku.price : sku.price.base
        return acc + price
    }, 0)
    return 15 + beadsPrice // 15 is base string price
}

export const selectBom = (state: State) => {
    const bom: Record<string, number> = {}
    state.beads.forEach(bead => {
        const sku = state.skuDefs[bead.skuId]
        if (sku) {
            // Use local name fallback for store BOM (UI uses its own logic)
            const name = typeof sku.name === 'string' ? sku.name : sku.name.en
            bom[name] = (bom[name] || 0) + 1
        }
    })
    return bom
}
