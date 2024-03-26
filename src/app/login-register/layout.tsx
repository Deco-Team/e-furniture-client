import { OAuthProviders } from './google-auth.provider'

export default function LoginRegisterLayout({ children }: { children: React.ReactNode }) {
  return <OAuthProviders>{children}</OAuthProviders>
}
