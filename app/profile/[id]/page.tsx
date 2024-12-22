'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter()
  const currentUser = useStore(state => state.currentUser)
  const users = useStore(state => state.users)
  
  const profileUser = users.find(user => user.id === params.id)

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!profileUser || !currentUser) return null

  const isOwnProfile = currentUser.id === profileUser.id

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={profileUser.avatar} alt={profileUser.name} />
            <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">{profileUser.name}</h1>
          <p className="text-gray-600 mb-4">{profileUser.email}</p>
          
          {isOwnProfile ? (
            <Button onClick={() => router.push('/settings')}>
              Edit Profile
            </Button>
          ) : (
            <Button onClick={() => router.push(`/chat/${profileUser.id}`)}>
              Send Message
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

