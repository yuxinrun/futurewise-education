import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Icon } from '../ui/Icon'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function BackTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button className={`back-top ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="回到顶部">
      <Icon name="arrow-up" size={18} />
    </button>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        跳到主要内容
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <BackTop />
    </>
  )
}
