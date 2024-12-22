'use client'

import { useState, useEffect } from 'react'
import { Send, User, Paperclip, X, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export default function Chat({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [newMessage, setNewMessage] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  
  const currentUser = useStore(state => state.currentUser)
  const messages = useStore(state => state.getMessages(params.id))
  const addMessage = useStore(state => state.addMessage)
  const users = useStore(state => state.users)
  
  const chatPartner = users.find(user => user.id === params.id)

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!chatPartner || !currentUser) {
    return null
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUser.id,
      receiverId: params.id,
      timestamp: Date.now()
    }

    addMessage(message)
    setNewMessage('')
    setSelectedFiles([])
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center">
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={chatPartner.avatar} alt={chatPartner.name} />
          <AvatarFallback>{chatPartner.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{chatPartner.name}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            {message.senderId !== currentUser.id && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={chatPartner.avatar} alt={chatPartner.name} />
                <AvatarFallback>{chatPartner.name[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className={`
              max-w-[80%] px-4 py-2 rounded-2xl
              ${message.senderId === currentUser.id 
                ? 'bg-blue-500 text-white rounded-br-sm' 
                : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
              }
            `}>
              <p className="text-sm">{message.content}</p>
            </div>
            {message.senderId === currentUser.id && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

