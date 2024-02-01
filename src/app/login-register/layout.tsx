import { OAuthProviders } from '~/app/providers'

export default function LoginRegisterLayout({ children }: { children: React.ReactNode }) {
  return <OAuthProviders>{children}</OAuthProviders>
}
