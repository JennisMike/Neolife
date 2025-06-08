import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qarqkzxrchopkmsrwgv.supabase.co"; // your Supabase URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhcmdrenhyY3Bob2twbXNyd2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTI0MDQsImV4cCI6MjA2NDg4ODQwNH0.rx1K5eEMaSi7Y1euhsQTMTnoPUzPfDnARzPsZsLI_pQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
