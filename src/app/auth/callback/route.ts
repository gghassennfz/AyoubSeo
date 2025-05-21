import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Using the provided Supabase credentials
const supabaseUrl = 'https://xdaxforszwladpqjapnd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYXhmb3JzendsYWRwcWphcG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODczNjcsImV4cCI6MjA2MzM2MzM2N30.fQkhyOlflDdhtLCovQFgpHT0_cWbtML1V7_a49hZGHw';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    // Create a simple server client without cookie handling
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            const cookieStore = cookies()
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            const cookieStore = cookies()
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            const cookieStore = cookies()
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )
    
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/auth/profile', request.url))
}
