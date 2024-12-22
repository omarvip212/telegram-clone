'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Settings() {
  const router = useRouter()
  const [name, setName] = useState('Your Name')
  const [imageUrl, setImageUrl] = useState('/placeholder-avatar.jpg')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically update the user profile in your backend
    localStorage.setItem('userName', name)
    localStorage.setItem('userImage', imageUrl)
    router.push('/chat')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={imageUrl} alt={name} />
                  <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 p-1 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload image</span>
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="w-full space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

