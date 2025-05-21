import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Using the provided Supabase credentials
const supabaseUrl = 'https://xdaxforszwladpqjapnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYXhmb3JzendsYWRwcWphcG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODczNjcsImV4cCI6MjA2MzM2MzM2N30.fQkhyOlflDdhtLCovQFgpHT0_cWbtML1V7_a49hZGHw';

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
