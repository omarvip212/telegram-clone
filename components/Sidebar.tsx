'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Settings, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const chatList = [
  { id: 1, name: 'Alice', message: 'Hey, how are you?' },
  { id: 2, name: 'Bob', message: 'Did you see the new movie?' },
  { id: 3, name: 'Charlie', message: 'Meeting at 3 PM' },
]

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userName, setUserName] = useState('Your Name')
  const [userImage, setUserImage] = useState('/placeholder-avatar.jpg')

  useEffect(() => {
    // Load user details from localStorage
    const storedName = localStorage.getItem('userName')
    const storedImage = localStorage.getItem('userImage')
    
    if (storedName) setUserName(storedName)
    if (storedImage) setUserImage(storedImage)
  }, [])

  const filteredChats = chatList.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-[280px] bg-white border-r flex flex-col h-full">
      {/* Profile Section */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-medium">{userName}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
      </div>

      {/* Search Section */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-50 border-0"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => (
          <Link 
            href={`/chat/${chat.id}`} 
            key={chat.id} 
            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage 
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.name}`} 
                alt={chat.name} 
              />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium truncate">{chat.name}</h3>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.message}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

