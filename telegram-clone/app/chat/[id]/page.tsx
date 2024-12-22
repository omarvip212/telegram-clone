'use client'

import { useState, useEffect } from 'react'
import { Send, User, Paperclip, X, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const messages = [
  { id: 1, sender: "Alice", content: "Hey, how are you?" },
  { id: 2, sender: "You", content: "I'm good, thanks! How about you?" },
  { id: 3, sender: "Alice", content: "Doing great! Any plans for the weekend?" },
]

export default function Chat({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState('')
  const [userName, setUserName] = useState('Your Name')
  const [userImage, setUserImage] = useState('/placeholder-avatar.jpg')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  useEffect(() => {
    // Load user details from localStorage
    const storedName = localStorage.getItem('userName')
    const storedImage = localStorage.getItem('userImage')
    
    if (storedName) setUserName(storedName)
    if (storedImage) setUserImage(storedImage)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sending message:', newMessage)
    if (selectedFiles.length > 0) {
      console.log('Sending files:', selectedFiles)
      // Here you would typically upload the files and send their URLs along with the message
    }
    setNewMessage('')
    setSelectedFiles([])
  }

  const filePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }
    return null
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center">
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=Alice`} alt="Alice" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Alice</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            {message.sender !== 'You' && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} alt={message.sender} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
            )}
            <div 
              className={`
                max-w-[80%] px-4 py-2 rounded-2xl
                ${message.sender === 'You' 
                  ? 'bg-blue-500 text-white rounded-br-sm' 
                  : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                }
              `}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            {message.sender === 'You' && (
              <Avatar className="h-8 w-8 ml-2">
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button type="submit" size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        {selectedFiles.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center bg-gray-100 rounded p-2">
                <Paperclip className="h-4 w-4 mr-2" />
                <span className="text-sm text-gray-600 truncate max-w-[150px]">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== index))}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove attachment</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

