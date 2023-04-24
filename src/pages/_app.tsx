import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <NavBar />
      <main className='main'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}
