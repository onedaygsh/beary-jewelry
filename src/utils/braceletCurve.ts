import { CatmullRomCurve3, Vector3 } from 'three'

// Perfect circular bracelet curve - larger radius for bigger beads
const radius = 3.5
const segmentCount = 64
const CURVE_POINTS = []

for (let i = 0; i < segmentCount; i++) {
    const theta = (i / segmentCount) * Math.PI * 2
    CURVE_POINTS.push(new Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius))
}

export const braceletCurve = new CatmullRomCurve3(CURVE_POINTS, true, 'centripetal', 0.1)
