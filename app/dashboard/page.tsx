'use client'

import { useState, useEffect } from 'react'
import { Bot, Plus, Copy, Check, Trash2, Settings, ExternalLink } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface Chatbot {
  id: string
  name: string
  description: string
  greeting: string
  primaryColor: string
  createdAt: string
}

export default function Dashboard() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingBot, setEditingBot] = useState<Chatbot | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('chatbots')
    if (saved) {
      setChatbots(JSON.parse(saved))
    }
  }, [])

  const saveChatbots = (bots: Chatbot[]) => {
    setChatbots(bots)
    localStorage.setItem('chatbots', JSON.stringify(bots))
  }

  const createChatbot = (bot: Omit<Chatbot, 'id' | 'createdAt'>) => {
    const newBot: Chatbot = {
      ...bot,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    }
    saveChatbots([...chatbots, newBot])
    setShowCreateModal(false)
  }

  const updateChatbot = (bot: Chatbot) => {
    saveChatbots(chatbots.map(b => b.id === bot.id ? bot : b))
    setEditingBot(null)
  }

  const deleteChatbot = (id: string) => {
    if (confirm('Are you sure you want to delete this chatbot?')) {
      saveChatbots(chatbots.filter(b => b.id !== id))
    }
  }

  const getEmbedCode = (id: string) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `<script src="${baseUrl}/widget.js" data-chatbot-id="${id}"></script>`
  }

  const copyEmbedCode = (id: string) => {
    navigator.clipboard.writeText(getEmbedCode(id))
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <header style={{
        padding: '1.5rem 2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={32} color="white" />
            <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: 'white',
              color: '#667eea',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Plus size={20} /> Create Chatbot
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '3rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {chatbots.length === 0 ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '2px dashed rgba(255, 255, 255, 0.3)'
          }}>
            <Bot size={64} color="white" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>No Chatbots Yet</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.125rem', marginBottom: '2rem' }}>
              Create your first chatbot to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                background: 'white',
                color: '#667eea',
                padding: '1rem 2rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Plus size={20} /> Create Your First Chatbot
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {chatbots.map(bot => (
              <div key={bot.id} style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.25rem' }}>
                      {bot.name}
                    </h3>
                    <p style={{ color: '#718096', fontSize: '0.875rem' }}>{bot.description}</p>
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: bot.primaryColor
                  }} />
                </div>

                <div style={{
                  background: '#f7fafc',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#4a5568'
                }}>
                  <strong>Greeting:</strong> {bot.greeting}
                </div>

                <div style={{
                  background: '#1a202c',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  color: '#e2e8f0',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  position: 'relative'
                }}>
                  {getEmbedCode(bot.id)}
                  <button
                    onClick={() => copyEmbedCode(bot.id)}
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      background: copiedId === bot.id ? '#48bb78' : '#4299e1',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {copiedId === bot.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => window.open(`/chat/${bot.id}`, '_blank')}
                    style={{
                      flex: 1,
                      background: bot.primaryColor,
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <ExternalLink size={16} /> Preview
                  </button>
                  <button
                    onClick={() => setEditingBot(bot)}
                    style={{
                      background: '#edf2f7',
                      color: '#2d3748',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Settings size={20} />
                  </button>
                  <button
                    onClick={() => deleteChatbot(bot.id)}
                    style={{
                      background: '#fed7d7',
                      color: '#c53030',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingBot) && (
        <ChatbotForm
          bot={editingBot}
          onSave={(bot) => editingBot ? updateChatbot(bot as Chatbot) : createChatbot(bot)}
          onClose={() => {
            setShowCreateModal(false)
            setEditingBot(null)
          }}
        />
      )}
    </div>
  )
}

function ChatbotForm({
  bot,
  onSave,
  onClose
}: {
  bot: Chatbot | null
  onSave: (bot: Omit<Chatbot, 'id' | 'createdAt'> | Chatbot) => void
  onClose: () => void
}) {
  const [name, setName] = useState(bot?.name || '')
  const [description, setDescription] = useState(bot?.description || '')
  const [greeting, setGreeting] = useState(bot?.greeting || 'Hi! How can I help you today?')
  const [primaryColor, setPrimaryColor] = useState(bot?.primaryColor || '#667eea')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (bot) {
      onSave({ ...bot, name, description, greeting, primaryColor })
    } else {
      onSave({ name, description, greeting, primaryColor })
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem' }}>
          {bot ? 'Edit Chatbot' : 'Create New Chatbot'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>
              Chatbot Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="My Support Bot"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>
              Description *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Helps customers with common questions"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>
              Greeting Message *
            </label>
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              required
              placeholder="Hi! How can I help you today?"
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>
              Primary Color *
            </label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{
                  width: '60px',
                  height: '40px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '0.875rem',
                border: '2px solid #e2e8f0',
                background: 'white',
                color: '#2d3748',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.875rem',
                border: 'none',
                background: '#667eea',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              {bot ? 'Update' : 'Create'} Chatbot
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
