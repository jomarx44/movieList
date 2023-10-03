import { createClient } from "@supabase/supabase-js";
const supabaseURL = "https://tlowycufguwbewddoyri.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsb3d5Y3VmZ3V3YmV3ZGRveXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3ODU3NjMsImV4cCI6MjAxMTM2MTc2M30.uHgWBBnI0NtcxVxIHSMp6kxyAvIfhmyU_NcMSnh9h3k";
export const supabase = createClient(supabaseURL, supabaseKey);
