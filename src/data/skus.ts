export type BeadType = string

export interface BeadSku {
    id: BeadType
    name: {
        en: string
        zh: string
        jp: string
    }
    subLabel: string // Keep as simple ID or make localized too? Let's genericize for now
    physicalWidth: number
    price: {
        base: number
        currencyCode: string // e.g. "USD"
    } | number // Backwards compat for transition, to be removed
    color: string
    materialType: 'gem' | 'metal' | 'matte' | 'lacquer'
    modelUrl: string
}

export const BASE_STRING_PRICE = 15.00

export interface OrderPayload {
    totalPrice: number
    currency: 'CNY'
    configuration: Array<{ skuId: BeadType; positionIndex: number }>
    bom: Record<string, number>
    timestamp: string
}

export interface OrderPayload {
    totalPrice: number
    currency: 'CNY'
    configuration: Array<{ skuId: BeadType; positionIndex: number }>
    bom: Record<string, number>
    timestamp: string
}
