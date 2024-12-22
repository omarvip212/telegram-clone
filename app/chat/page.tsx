'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'

export default function ChatPage() {
  const router = useRouter()
  const currentUser = useStore(state => state.currentUser)
  const users = useStore(state => state.users)

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
      return
    }
    
    // إذا كان هناك مستخدمين آخرين، انتقل إلى أول محادثة
    const firstUser = users.find(user => user.id !== currentUser.id)
    if (firstUser) {
      router.push(`/chat/${firstUser.id}`)
    }
  }, [currentUser, users, router])

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">Select a chat to start messaging</p>
    </div>
  )
}

