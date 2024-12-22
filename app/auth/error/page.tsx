'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

const getErrorMessage = (error: string | null) => {
  switch (error) {
    case 'Configuration':
      return 'There is a problem with the server configuration.'
    case 'AccessDenied':
      return 'You do not have permission to sign in.'
    case 'Verification':
      return 'The verification link has expired or has already been used.'
    case 'OAuthSignin':
      return 'Error in the OAuth sign-in process.'
    case 'OAuthCallback':
      return 'Error in the OAuth callback process.'
    case 'OAuthCreateAccount':
      return 'Could not create OAuth provider user in the database.'
    case 'EmailCreateAccount':
      return 'Could not create email provider user in the database.'
    case 'Callback':
      return 'Error in the OAuth callback handler.'
    default:
      return 'An unexpected error occurred.'
  }
}

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (!error) {
      router.push('/register')
    }
  }, [error, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-center">Authentication Error</h2>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {getErrorMessage(error)}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full"
            onClick={() => router.push('/register')}
          >
            Back to Register
          </Button>
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => router.push('/login')}
          >
            Try Login
          </Button>
        </div>
      </div>
    </div>
  )
} 