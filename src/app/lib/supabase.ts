import { createBrowserClient } from '@supabase/ssr'

// Using the provided Supabase credentials
const supabaseUrl = 'https://xdaxforszwladpqjapnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYXhmb3JzendsYWRwcWphcG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODczNjcsImV4cCI6MjA2MzM2MzM2N30.fQkhyOlflDdhtLCovQFgpHT0_cWbtML1V7_a49hZGHw';

export const createClient = () => {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
