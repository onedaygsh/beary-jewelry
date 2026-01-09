import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
const envConfig = dotenv.parse(fs.readFileSync(envPath))

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envConfig.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function verifyConnection() {
    console.log('Testing Supabase Connection...')
    console.log('URL:', supabaseUrl)

    // 1. Validating connection by a simple dummy select (optional, but good)
    // We can try to select from 'profiles' or just proceed to insert if tables exist.

    // 2. Insert Test Data into 'designs'
    console.log('Attempting to insert test design...')

    const testDesign = {
        title: 'Hello World Test',
        config_json: {
            beads: [],
            note: 'This is a test insertion from the agent verification script.'
        },
        is_public: false
    }

    const { data, error } = await supabase
        .from('designs')
        .insert([testDesign])
        .select()

    if (error) {
        console.error('❌ Insertion Failed:', error.message)
        console.error('Detail:', error)
    } else {
        console.log('✅ Success! Test design inserted.')
        console.log('Inserted ID:', data[0].id)

        // Cleanup (Optional)
        // console.log('Cleaning up test data...')
        // await supabase.from('designs').delete().eq('id', data[0].id)
    }
}

verifyConnection()
