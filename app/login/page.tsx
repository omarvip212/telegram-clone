'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to authenticate the user
    console.log('Logging in user:', email)
    // For this example, we'll just redirect to the chat page
    router.push('/chat')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">Login to TeleChat</h2>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  )
}

