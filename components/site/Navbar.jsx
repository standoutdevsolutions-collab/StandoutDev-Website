// components/site/Navbar.jsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About Us' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const touchStartY = useRef(0)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Swipe down to close
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    if (deltaY > 80) setOpen(false)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div className={`mx-auto w-[96%] max-w-[1450px] transition-all duration-500 ${scrolled ? 'pt-2' : 'pt-3'}`}>
        <div
          className={`flex items-center justify-between rounded-2xl border transition-all duration-500 ${
            scrolled
              ? 'bg-[#0A0E27]/80 backdrop-blur-2xl border-white/10 shadow-xl shadow-black/20 py-2.5 px-6 lg:px-8'
              : 'bg-[#0A0E27]/50 backdrop-blur-xl border-white/[0.06] py-3 px-6 lg:px-8'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-white/10 group-hover:ring-cyan-400/30 transition-all">
              <Image
                src="/logo.png"
                alt="StandoutDev"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Standout<span className="grad-text">Dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-[#0A0E27] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-400/25 magnetic-btn"
          >
            Book a Call
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-xl border border-white/10 p-2.5 text-white hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Full-Screen Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 top-0 z-[200] bg-[#0A0E27]/98 backdrop-blur-3xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Swipe Handle */}
              <div className="flex justify-center pt-4">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <p className="text-center text-xs text-white/30 mt-2 mb-4">Swipe down to close</p>

              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 rounded-xl border border-white/10 p-2.5 text-white hover:bg-white/5 transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center justify-center h-full -mt-16 px-8">
                <nav className="flex flex-col items-center gap-2 w-full max-w-sm">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="w-full"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-center rounded-2xl px-6 py-4 text-2xl font-display font-semibold transition-all ${
                          pathname === link.href
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="mt-8 w-full max-w-sm"
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 text-lg font-semibold text-[#0A0E27]"
                  >
                    Book a Call
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}