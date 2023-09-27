import { AuthWrapper } from '@@/components/auth/AuthWrapper'
import { HeadSait } from '@@/components/base/headSait'
import '@@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadSait />
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </>
  )


}
