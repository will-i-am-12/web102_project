import { createClient } from '@supabase/supabase-js'

const URL = 'https://rnsjeaxoudhphlarydto.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuc2plYXhvdWRocGhsYXJ5ZHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODU4NTcsImV4cCI6MjA2ODk2MTg1N30.LN8E7wQRFq635l70EYfXYu2CghhUBUNh0b6CSQe-ti8'

export const supabase = createClient(URL,API_KEY)