import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mtjvjbyhzaofpkrcqtko.supabase.co";
const supabaseKey = import.meta.env.VITE_API_KEY_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
