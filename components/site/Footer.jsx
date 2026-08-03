// components/site/Footer.jsx
'use client'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const designServices = [
  { label: 'UI/UX Design', href: '/services' },
  { label: 'Branding', href: '/services' },
  { label: 'Motion Graphics', href: '/services' },
  { label: 'Mobile App Design', href: '/services' },
  { label: 'SaaS Design', href: '/services' },
  { label: 'Web Design', href: '/services' },
]

const devServices = [
  { label: 'Web Development', href: '/services' },
  { label: 'WordPress', href: '/services' },
  { label: 'Shopify', href: '/services' },
  { label: 'Webflow', href: '/services' },
]

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Team', href: '/about' },
  { label: 'Career', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 footer-animated-bg" />
      <div className="absolute inset-0 bg-[#070a1f]/95" />

      {/* Subtle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 5 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + HQ */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-[#0a0e27] font-black text-lg group-hover:scale-105 transition-transform">
                S
              </span>
              <span className="font-display text-xl font-semibold">
                Standout<span className="grad-text">Dev</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-white/50 leading-relaxed text-sm">
              A design & engineering studio building cinematic web experiences, brands,
              and products for teams that refuse to blend in.
            </p>

            <div className="mt-5">
              <div className="text-xs uppercase tracking-widest text-white/30 mb-2">Headquarters</div>
              <p className="text-sm text-white/50">
                Pune, Maharashtra 411052<br />
                India · Available Worldwide
              </p>
            </div>

            {/* Socials */}
            <div className="mt-5 flex gap-2">
              {[
                { label: 'Dribbble', href: '#' },
                { label: 'X', href: '#' },
                { label: 'Instagram', href: 'https://www.instagram.com/standout.dev' },
                { label: 'GitHub', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/50 hover:bg-white hover:text-[#0a0e27] transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Design Services */}
          <div>
            <div className="text-xs uppercase tracking-widest text-white/30 mb-4">Design Services</div>
            <ul className="space-y-2.5">
              {designServices.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-white/50 hover:text-white transition-colors link-underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dev Services */}
          <div>
            <div className="text-xs uppercase tracking-widest text-white/30 mb-4">Development</div>
            <ul className="space-y-2.5">
              {devServices.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-white/50 hover:text-white transition-colors link-underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs uppercase tracking-widest text-white/30 mb-4">Company</div>
            <ul className="space-y-2.5">
              {company.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-white/50 hover:text-white transition-colors link-underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-white/30 mb-2">Get in touch</div>
              <a
                href="mailto:standoutdevsolutions@gmail.com"
                className="text-sm grad-text font-medium"
              >
                standoutdevsolutions@gmail.com
              </a>
              <p className="mt-1 text-xs text-white/40">+91 93223 96236</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} StandoutDev. All rights reserved. WE BUILD, YOU STAND OUT.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
          </div>
        </div>
      </div>

      {/* Giant watermark text */}
      <div className="relative overflow-hidden pb-4">
        <div className="font-display text-[13vw] leading-none font-bold text-white/[0.02] text-center select-none whitespace-nowrap">
          STANDOUTDEV
        </div>
      </div>
    </footer>
  )
}