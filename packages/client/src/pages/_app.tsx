
import { Header } from '@@/components/base/header/header'
import '@@/styles/globals.css'
import { AuthWrapper } from '@@/unitls/authWrapper'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthWrapper>
        <Header />
        <Component {...pageProps} />
      </AuthWrapper>
    </>
  )


}
