'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Mock data for chat list and messages
const chatList = [
  { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?' },
  { id: 2, name: 'Bob', lastMessage: 'Did you see the new movie?' },
  { id: 3, name: 'Charlie', lastMessage: 'Meeting at 3 PM' },
]

const messages = [
  { id: 1, sender: "Alice", content: "Hey, how are you?" },
  { id: 2, sender: "You", content: "I'm good, thanks! How about you?" },
  { id: 3, sender: "Alice", content: "Doing great! Any plans for the weekend?" },
]

export default function Chat() {
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const filteredChats = chatList.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the message to your backend
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat list */}
      <div className="w-1/3 bg-white border-r">
        <div className="p-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          {filteredChats.map(chat => (
            <Link href={`/chat/${chat.id}`} key={chat.id} className="flex items-center p-3 hover:bg-gray-100 rounded">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.name}`} alt={chat.name} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="font-semibold">{chat.name}</div>
                <div className="text-sm text-gray-500">{chat.lastMessage}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`max-w-xs ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded-lg p-3`}>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

