'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Minimize2 } from 'lucide-react'
import { useParams } from 'next/navigation'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface Chatbot {
  id: string
  name: string
  description: string
  greeting: string
  primaryColor: string
}

export default function ChatPage() {
  const params = useParams()
  const [chatbot, setChatbot] = useState<Chatbot | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('chatbots')
    if (saved) {
      const bots = JSON.parse(saved)
      const bot = bots.find((b: Chatbot) => b.id === params.id)
      if (bot) {
        setChatbot(bot)
        setMessages([{
          id: '1',
          text: bot.greeting,
          sender: 'bot',
          timestamp: new Date()
        }])
      }
    }
  }, [params.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help you. What can I assist you with today?"
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "Our pricing plans are flexible and designed to fit your needs. Please visit our pricing page or contact our sales team for detailed information."
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about our products, services, pricing, or any general questions you might have."
    }
    if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
      return "We're available 24/7 online! Our physical offices are open Monday-Friday, 9 AM - 5 PM EST."
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach us at support@example.com or call us at 1-800-EXAMPLE. We typically respond within 24 hours."
    }
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?"
    }
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Goodbye! Feel free to come back if you have more questions. Have a great day!"
    }

    return "I understand you're asking about: '" + userMessage + "'. While I'm a demo chatbot, a fully configured bot would be trained on your specific business information to provide accurate answers. Can I help you with anything else?"
  }

  const handleSend = () => {
    if (!input.trim() || !chatbot) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  if (!chatbot) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Chatbot not found
      </div>
    )
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f7fafc'
    }}>
      {/* Header */}
      <div style={{
        background: chatbot.primaryColor,
        color: 'white',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Bot size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.125rem' }}>{chatbot.name}</h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>{chatbot.description}</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.map(message => (
          <div key={message.id} style={{
            display: 'flex',
            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            gap: '0.75rem'
          }}>
            {message.sender === 'bot' && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: chatbot.primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={20} color="white" />
              </div>
            )}
            <div style={{
              maxWidth: '70%',
              background: message.sender === 'user' ? chatbot.primaryColor : 'white',
              color: message.sender === 'user' ? 'white' : '#1a202c',
              padding: '0.875rem 1.125rem',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              wordWrap: 'break-word'
            }}>
              {message.text}
            </div>
            {message.sender === 'user' && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#cbd5e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={20} color="#2d3748" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: chatbot.primaryColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={20} color="white" />
            </div>
            <div style={{
              background: 'white',
              padding: '0.875rem 1.125rem',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              gap: '0.375rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#cbd5e0',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '-0.32s'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#cbd5e0',
                animation: 'bounce 1.4s infinite ease-in-out both',
                animationDelay: '-0.16s'
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#cbd5e0',
                animation: 'bounce 1.4s infinite ease-in-out both'
              }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '1.25rem 1.5rem',
        background: 'white',
        borderTop: '1px solid #e2e8f0',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '0.875rem 1.125rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = chatbot.primaryColor}
            onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              background: chatbot.primaryColor,
              color: 'white',
              border: 'none',
              padding: '0.875rem 1.5rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600',
              opacity: input.trim() ? 1 : 0.5,
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => input.trim() && (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Send size={20} /> Send
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
