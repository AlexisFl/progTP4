import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

  const apiKey = process.env.SUPABASE_WEBHOOK_KEY

  if(!request.headers.has("api-key"))
    return NextResponse.json({message: "API-Key header is missing"}, {status: 401})

  if(request.headers.get("api-key") != apiKey)
    return NextResponse.json({message: "API-Key is not valid"}, {status: 403})

  return NextResponse.json({
    revalidated: true,
    date: new Date()
  })
}