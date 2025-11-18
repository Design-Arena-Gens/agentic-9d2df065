'use client'

import { useState } from 'react'
import { Bot, Sparkles, Zap, Code, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot size={32} color="white" />
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>ChatBot SaaS</h1>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            background: 'white',
            color: '#667eea',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Go to Dashboard
        </button>
      </header>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Create Custom AI Chatbots for Your Business
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.25rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Build, customize, and deploy intelligent chatbots in minutes.
            No coding required. Just copy a simple script and paste it on your website.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              background: 'white',
              color: '#667eea',
              padding: '1rem 2.5rem',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '700',
              fontSize: '1.125rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Get Started Free <ArrowRight size={20} />
          </button>
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          width: '100%',
          marginTop: '4rem'
        }}>
          {[
            { icon: Sparkles, title: 'Easy Setup', desc: 'Create your chatbot in under 5 minutes' },
            { icon: Code, title: 'Simple Integration', desc: 'Just paste one line of code on your site' },
            { icon: Zap, title: 'Instant Deploy', desc: 'Get your unique URL and start chatting' },
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center'
            }}>
              <feature.icon size={48} color="white" style={{ marginBottom: '1rem' }} />
              <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        background: 'rgba(0, 0, 0, 0.1)'
      }}>
        <p>&copy; 2024 ChatBot SaaS. All rights reserved.</p>
      </footer>
    </div>
  )
}
