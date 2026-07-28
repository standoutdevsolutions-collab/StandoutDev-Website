import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070a1f]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-[#0a0e27] font-black">S</span>
              <span className="font-display text-xl font-semibold">standout<span className="grad-text">dev</span></span>
            </div>
            <p className="mt-6 max-w-md text-white/60 leading-relaxed">A design & engineering studio building cinematic web experiences, brands, and products for teams that refuse to blend in.</p>
            <div className="mt-6 flex gap-3">
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
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-white/70 hover:bg-white hover:text-[#0a0e27] transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Studio</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/about" className="link-underline text-white/70 hover:text-white">About</Link></li>
              <li><Link href="/services" className="link-underline text-white/70 hover:text-white">Services</Link></li>
              <li><Link href="/work" className="link-underline text-white/70 hover:text-white">Work</Link></li>
              <li><Link href="/contact" className="link-underline text-white/70 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Get in touch</div>
            <a href="mailto:standoutdevsolutions@gmail.com" className="mt-4 block font-display  grad-text">standoutdevsolutions@gmail.com</a>
            <p className="mt-3 text-sm text-white/50">+91 93223 96236</p>
            <p className="mt-3 text-sm text-white/50">Pune, Maharashtra 411052 · Worldwide</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} Standoutdev. WE BUILD , YOU STAND OUT.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden pb-4">
        <div className="font-display text-[15vw] leading-none font-bold text-white/[0.03] text-center select-none whitespace-nowrap">STANDOUTDEV</div>
      </div>
    </footer>
  )
}
