'use client'
import Link from 'next/link'

/* ============================================
   STATIC PARTICLES — deterministic, SSR-safe
   ============================================ */
const PARTICLES = [
  { left: 4,  top: 18, size: 2.4, dur: 6.2, delay: 0.4 },
  { left: 12, top: 62, size: 1.6, dur: 7.8, delay: 1.9 },
  { left: 19, top: 33, size: 3.1, dur: 5.4, delay: 3.2 },
  { left: 26, top: 78, size: 1.9, dur: 8.5, delay: 0.9 },
  { left: 33, top: 12, size: 2.7, dur: 6.9, delay: 2.6 },
  { left: 41, top: 55, size: 1.4, dur: 7.2, delay: 4.1 },
  { left: 48, top: 88, size: 3.4, dur: 5.8, delay: 1.3 },
  { left: 55, top: 26, size: 2.1, dur: 8.1, delay: 3.7 },
  { left: 62, top: 70, size: 1.7, dur: 6.5, delay: 0.6 },
  { left: 69, top: 41, size: 2.9, dur: 7.6, delay: 2.2 },
  { left: 76, top: 84, size: 1.3, dur: 5.1, delay: 4.5 },
  { left: 83, top: 15, size: 3.2, dur: 8.8, delay: 1.6 },
  { left: 89, top: 59, size: 2.0, dur: 6.7, delay: 3.4 },
  { left: 94, top: 30, size: 1.8, dur: 7.4, delay: 0.2 },
  { left: 98, top: 73, size: 2.6, dur: 5.9, delay: 2.9 },
]

const designServices = [
  { label: 'UI/UX Design',      href: '/services' },
  { label: 'Branding',          href: '/services' },
  { label: 'Motion Graphics',   href: '/services' },
  { label: 'Mobile App Design', href: '/services' },
  { label: 'SaaS Design',       href: '/services' },
  { label: 'Web Design',        href: '/services' },
]

const devServices = [
  { label: 'Web Development', href: '/services' },
  { label: 'WordPress',       href: '/services' },
  { label: 'Shopify',         href: '/services' },
  { label: 'Webflow',         href: '/services' },
]

const company = [
  { label: 'About Us', href: '/about'   },
  { label: 'FAQs',     href: '/faq'     },
  { label: 'Blog',     href: '/blog'    },
  { label: 'Team',     href: '/about'   },
  { label: 'Career',   href: '/contact' },
]

const socials = [
  { label: 'Dribbble',  href: '#' },
  { label: 'X',         href: '#' },
  { label: 'Instagram', href: 'https://www.instagram.com/standout.dev' },
  { label: 'GitHub',    href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer-root">
      <style>{`
        .footer-root {
          position: relative;
          z-index: 10;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: #020617;
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 100%, #0a1a35 0%, #050d1f 45%, #020617 100%);
          pointer-events: none;
        }

        .footer-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .footer-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at 50% 100%, black 10%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 100%, black 10%, transparent 70%);
          pointer-events: none;
        }

        @keyframes footer-twinkle {
          0%, 100% { opacity: .15; transform: translateY(0) scale(1); }
          50%      { opacity: .8;  transform: translateY(-10px) scale(1.3); }
        }

        .footer-particle {
          position: absolute;
          border-radius: 50%;
          background: #06b6d4;
          animation-name: footer-twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          pointer-events: none;
        }

        .footer-grad-text {
          background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #818cf8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .footer-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .2em;
          color: rgba(255,255,255,.3);
          margin-bottom: 16px;
        }

        .footer-link {
          font-size: 14px;
          color: rgba(255,255,255,.5);
          text-decoration: none;
          transition: color .3s;
        }
        .footer-link:hover { color: #fff; }

        .footer-social {
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 6px 14px;
          font-size: 12px;
          color: rgba(255,255,255,.5);
          text-decoration: none;
          transition: all .3s;
        }
        .footer-social:hover {
          background: linear-gradient(135deg, #2563eb, #0891b2);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 20px rgba(59,130,246,.4);
        }

        .footer-watermark {
          font-size: 13vw;
          line-height: .85;
          font-weight: 900;
          letter-spacing: -.05em;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          background: linear-gradient(180deg, rgba(255,255,255,.045) 0%, rgba(255,255,255,0) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Background */}
      <div className="footer-bg" />
      <div className="footer-grid" />

      <div className="footer-orb" style={{
        bottom: '-20%', left: '-5%',
        width: 'min(600px, 70vw)', height: 'min(600px, 70vw)',
        background: 'radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%)',
      }} />
      <div className="footer-orb" style={{
        top: '-10%', right: '-5%',
        width: 'min(500px, 60vw)', height: 'min(500px, 60vw)',
        background: 'radial-gradient(circle, rgba(6,182,212,.14) 0%, transparent 70%)',
      }} />

      {/* Particles — deterministic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="footer-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: `0 0 ${p.size * 4}px rgba(6,182,212,.6)`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: 40, width: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
                color: '#020617', fontWeight: 900, fontSize: 18,
                boxShadow: '0 4px 20px rgba(59,130,246,.4)',
                transition: 'transform .3s',
              }} className="group-hover:scale-105">
                S
              </span>
              <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.02em' }}>
                Standout<span className="footer-grad-text">Dev</span>
              </span>
            </Link>

            <p style={{
              marginTop: 20, maxWidth: 380, fontSize: 14,
              color: 'rgba(255,255,255,.5)', lineHeight: 1.7,
            }}>
              A design &amp; engineering studio building cinematic web experiences,
              brands, and products for teams that refuse to blend in.
            </p>

            <div style={{ marginTop: 24 }}>
              <div className="footer-label" style={{ marginBottom: 8 }}>Headquarters</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.7 }}>
                Pune, Maharashtra 411052<br />
                India · Available Worldwide
              </p>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social"
                  {...(s.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Design Services */}
          <div>
            <div className="footer-label">Design Services</div>
            <ul className="space-y-2.5">
              {designServices.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="footer-link">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Development */}
          <div>
            <div className="footer-label">Development</div>
            <ul className="space-y-2.5">
              {devServices.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="footer-link">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="footer-label">Company</div>
            <ul className="space-y-2.5">
              {company.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="footer-link">{s.label}</Link>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 28 }}>
              <div className="footer-label" style={{ marginBottom: 8 }}>Get in touch</div>
              <a
                href="mailto:standoutdevsolutions@gmail.com"
                className="footer-grad-text"
                style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
              >
                standoutdevsolutions@gmail.com
              </a>
              <p style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
                +91 93223 96236
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
            © {new Date().getFullYear()} StandoutDev. All rights reserved. WE BUILD, YOU STAND OUT.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="footer-link" style={{ fontSize: 12 }}>Privacy Policy</Link>
            <Link href="/terms"   className="footer-link" style={{ fontSize: 12 }}>Terms of Use</Link>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="relative overflow-hidden pb-4">
        <div className="footer-watermark">STANDOUTDEV</div>
      </div>
    </footer>
  )
}