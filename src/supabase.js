import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://iheesrzbuoyqqozhfxjp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZWVzcnpidW95cXFvemhmeGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxMTcyNjUsImV4cCI6MTk2OTY5MzI2NX0.cuBZi_a6g-bNcVizyjnRe7pFWkao3XHp6UU-TVp-QZA');

export default supabase;