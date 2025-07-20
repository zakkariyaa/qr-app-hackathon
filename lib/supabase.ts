// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { volunteers } from '../types/supabase'

const SUPABASE_URL = 'https://wtsipfxxktqndiksuvak.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c2lwZnh4a3RxbmRpa3N1dmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzEzNjksImV4cCI6MjA2ODUwNzM2OX0.1Zj-TPjqYfs6M7jZ13BZj8PZIABlm_klcu7elyre92k'

export const supabase = createClient<volunteers>(
    SUPABASE_URL, 
    SUPABASE_ANON_KEY
)
