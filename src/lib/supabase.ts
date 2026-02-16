import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️  VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY manquants.\n' +
    'Créez un fichier .env à la racine du projet avec :\n' +
    'VITE_SUPABASE_URL=https://xxxxx.supabase.co\n' +
    'VITE_SUPABASE_ANON_KEY=eyJhbGci...\n'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')