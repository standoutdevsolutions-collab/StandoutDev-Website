'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div
        className={`mx-auto w-[96%] max-w-[1450px] transition-all duration-500 ${
          scrolled ? 'pt-2' : 'pt-3'
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl border backdrop-blur-2xl transition-all duration-500
          ${
            scrolled
              ? 'bg-[#0A0E27]/85 border-white/10 shadow-xl py-2.5 px-6 lg:px-8'
              : 'bg-[#0A0E27]/65 border-white/10 shadow-lg py-3 px-6 lg:px-8'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/logo.png"
                alt="StandoutDev"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <span className="text-xl font-bold tracking-tight text-white">
              Standout
              <span className="text-cyan-400">Dev</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}

                {pathname === link.href && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#0A0E27] transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Start a Project
            <span>→</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg border border-white/10 p-2 text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E27]/95 backdrop-blur-2xl"
            >
              <div className="flex flex-col p-5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                      pathname === link.href
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0A0E27]"
                >
                  Start a Project →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}