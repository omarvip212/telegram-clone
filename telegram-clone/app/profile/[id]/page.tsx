import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// Mock user data
const user = {
  id: 1,
  name: 'Alice Johnson',
  email: 'alice@example.com',
  bio: 'Software developer and coffee enthusiast',
}

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <p className="text-center mb-6">{user.bio}</p>
          <Button>Send Message</Button>
        </div>
      </div>
    </div>
  )
}

