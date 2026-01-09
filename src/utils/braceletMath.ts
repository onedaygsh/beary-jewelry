export interface Point {
    x: number
    y: number
    rotation: number
}

/**
 * Calculates the position and rotation of each bead on a circle.
 * 
 * @param count Total number of beads
 * @param radius Radius of the bracelet circle
 * @param cx Center X
 * @param cy Center Y
 * @returns Array of Points
 */
export function calculateBeadPositions(
    count: number,
    radius: number,
    cx: number,
    cy: number
): Point[] {
    const positions: Point[] = []

    // Start from top (-90 degrees in standard math, or -PI/2)
    // Distribute evenly around the circle
    const angleStep = (2 * Math.PI) / count
    const startAngle = -Math.PI / 2

    for (let i = 0; i < count; i++) {
        const theta = startAngle + (i * angleStep)

        const x = cx + radius * Math.cos(theta)
        const y = cy + radius * Math.sin(theta)

        // Rotation: Tangential to the circle
        // The bead should "face" outward or inward.
        // theta is the angle from center. 
        // Convert to degrees + 90 to align bead texture vertically along the radius
        const rotation = (theta * 180) / Math.PI + 90

        positions.push({ x, y, rotation })
    }

    return positions
}
