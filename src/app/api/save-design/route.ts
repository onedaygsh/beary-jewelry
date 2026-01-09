import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase Client
// NOTE: utilizing Service Role Key for server-side operations to bypass RLS if needed,
// or ensuring we strictly validate session if using Anon key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // MUST be in .env.local

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { config, userId, title } = body

        if (!config || !Array.isArray(config.beads)) {
            return NextResponse.json(
                { error: 'Invalid configuration data' },
                { status: 400 }
            )
        }

        // Insert into 'designs' table
        const { data, error } = await supabase
            .from('designs')
            .insert([
                {
                    user_id: userId || null, // Null for guests
                    config_json: config,
                    title: title || 'My Custom Bracelet',
                    is_public: false // Default to private
                }
            ])
            .select()
            .single()

        if (error) {
            console.error('Supabase Error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, design: data })

    } catch (err) {
        console.error('API Error:', err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
