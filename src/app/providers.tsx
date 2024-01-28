'use client'

import { NextUIProvider } from '@nextui-org/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useRouter } from 'next/navigation'

const client_id = process.env.CLIENT_ID || ''

export function NextUIProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
}

export function OAuthProviders({ children }: { children: React.ReactNode }) {
  return <GoogleOAuthProvider clientId={client_id}>{children}</GoogleOAuthProvider>
}
