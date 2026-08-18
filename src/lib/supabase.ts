import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.includes('bcsyyyl') ? 'https://bcsyyylqmxspjupjlchg.supabase.co' : import.meta.env.VITE_SUPABASE_URL || 'https://bcsyyylqmxspjupjlchg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjc3l5eWxxbXhzcGp1cGpsY2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5OTA0MDEsImV4cCI6MjEwMjU2NjQwMX0.LmFKKMaJDKTYyPZCSs7jRASPw7Z4JImZ7m-oPJA3cRE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
