'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Settings, User, LogOut } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export function Sidebar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  
  const currentUser = useStore(state => state.currentUser)
  const users = useStore(state => state.users)
  const logout = useStore(state => state.logout)

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const filteredUsers = users.filter(user => 
    user.id !== currentUser.id && 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="w-[280px] bg-white border-r flex flex-col h-full">
      {/* Profile Section */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-medium">{currentUser.name}</h2>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-50 border-0"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map(user => (
          <Link 
            href={`/chat/${user.id}`} 
            key={user.id} 
            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium truncate">{user.name}</h3>
              </div>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

