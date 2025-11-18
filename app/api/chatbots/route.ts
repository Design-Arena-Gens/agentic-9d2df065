import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    return NextResponse.json({
      id,
      name: 'Demo Chatbot',
      description: 'A demo chatbot for testing',
      greeting: 'Hi! How can I help you today?',
      primaryColor: '#667eea'
    })
  }

  return NextResponse.json({ error: 'Chatbot ID required' }, { status: 400 })
}
