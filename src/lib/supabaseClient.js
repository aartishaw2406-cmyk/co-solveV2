import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.https://khhqgmpvajzdlzlwwmjp.supabase.co
const supabaseKey = import.meta.env.sb_publishable_Mb_ZASK9ARdPH2PCuGh7ig_z0Pc74pB
export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)