import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const token = data.get('cf-turnstile-response')

  if (!token) {
    return NextResponse.json({ error: 'Missing CAPTCHA token' }, { status: 400 })
  }

  const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })

  const result = await verification.json()
  if (!result.success) {
    return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 })
  }

  const formspreeData = new FormData()
  formspreeData.append('name', data.get('name') as string)
  formspreeData.append('email', data.get('email') as string)
  formspreeData.append('message', data.get('message') as string)

  const formspreeRes = await fetch('https://formspree.io/f/xzdyvanz', {
    method: 'POST',
    body: formspreeData,
    headers: { Accept: 'application/json' },
  })

  if (!formspreeRes.ok) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
