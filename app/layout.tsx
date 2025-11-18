import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChatBot SaaS - Create Custom AI Chatbots',
  description: 'Create and deploy custom chatbots for your business in minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
