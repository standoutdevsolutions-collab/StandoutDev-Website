// app/page.js
'use client'
import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  ArrowUpRight, Sparkles, Layers,
  Plus, Minus, Quote, Star, Globe, ShoppingBag,
  Palette, Code, Smartphone, MonitorPlay, ShoppingCart,
  LayoutDashboard, Clapperboard, PenTool, ChevronDown
} from 'lucide-react'
import CountUp from '@/components/site/CountUp'
import CinematicLaptop from '@/components/site/CinematicLaptop'

// Dynamic 3D logo (no SSR)
const Logo3DScene = dynamic(() => import('@/components/site/Logo3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-16 w-16 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
    </div>
  ),
})

/* ============================================
   MULTILINGUAL "STANDOUT DEV" DATA
   ============================================ */
const brandNames = [
  { text: 'StandOut Dev',   lang: 'English'    },
  { text: 'スタンドアウト Dev', lang: 'Japanese'   },
  { text: 'ستاندأوت ديف',   lang: 'Arabic'     },
  { text: 'StandOut Dev',   lang: 'French'     },
  { text: '스탠드아웃 Dev',   lang: 'Korean'     },
  { text: 'StandOut Dev',   lang: 'Spanish'    },
  { text: 'स्टैंडआउट Dev',   lang: 'Hindi'      },
  { text: '斯坦德Dev',       lang: 'Chinese'    },
  { text: 'StandOut Dev',   lang: 'Italian'    },
  { text: 'СтэндАут Dev',   lang: 'Russian'    },
  { text: 'StandOut Dev',   lang: 'Portuguese' },
  { text: 'StandOut Dev',   lang: 'German'     },
  { text: 'StandOut Dev',   lang: 'Turkish'    },
  { text: 'สแตนด์เอาต์ Dev', lang: 'Thai'       },
  { text: 'StandOut Dev',   lang: 'Swedish'    },
  { text: 'ΣτάντΑουτ Dev',  lang: 'Greek'      },
]

/* ============================================
   LIGHTWEIGHT PARTICLE FIELD (highly optimized)
   ============================================ */
const ParticleField = memo(function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let isVisible = true
    const particles = []
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width  = w * DPR
      canvas.height = h * DPR
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(DPR, DPR)
    }
    resize()

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }
    window.addEventListener('resize', onResize)

    // Pause when tab is hidden
    const onVisibility = () => {
      isVisible = !document.hidden
      if (isVisible && !animId) tick()
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Much fewer particles for smoothness
    const COUNT = window.innerWidth < 768 ? 25 : 40
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        r:  Math.random() * 1.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        op: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const tick = () => {
      if (!isVisible) {
        animId = null
        return
      }
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(120, 220, 255, 0.5)'
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.018
        if (p.x < 0) p.x = w
        else if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        else if (p.y > h) p.y = 0

        const twinkle = 0.5 + 0.5 * Math.sin(p.pulse)
        ctx.globalAlpha = p.op * twinkle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimeout(resizeTimer)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
})

/* ============================================
   ORBIT RINGS — pure CSS, GPU accelerated,
   client-only to avoid any layout jitter
   ============================================ */
function OrbitRings() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const rings = [
    { size: 460, duration: 40, opacity: 0.4,  reverse: false },
    { size: 720, duration: 60, opacity: 0.22, reverse: true  },
    { size: 980, duration: 80, opacity: 0.12, reverse: false },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {rings.map((r, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 pointer-events-none rounded-full border border-cyan-300/[0.06]"
          style={{
            width: r.size,
            height: r.size,
            marginLeft: -r.size / 2,
            marginTop: -r.size / 2,
            animation: `${r.reverse ? 'orbit-reverse' : 'orbit'} ${r.duration}s linear infinite`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          <div
            className="absolute h-2 w-2 rounded-full bg-cyan-300"
            style={{
              opacity: r.opacity,
              left: '50%',
              top: -4,
              marginLeft: -4,
              boxShadow: '0 0 10px rgba(103, 232, 249, 0.8)',
            }}
          />
        </div>
      ))}
    </div>
  )
}

/* ============================================
   ROTATING BRAND NAME — smooth pure fade
   No blur (heavy on GPU), no scale (causes reflow)
   Just clean opacity crossfade
   ============================================ */
function RotatingBrandName() {
  const [idx, setIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const iv = setInterval(() => {
      setIdx((p) => (p + 1) % brandNames.length)
    }, 3200)
    return () => clearInterval(iv)
  }, [])

  const current = brandNames[idx]
  const isNonLatin = ['Japanese','Chinese','Korean','Thai','Arabic','Hindi'].includes(current.lang)

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Static behind-glow — no animation, just a pretty static halo */}
      <div className="absolute -inset-x-32 -inset-y-14 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-400/15 to-violet-500/20 blur-[90px]" />
      </div>

      {/* Text — pure opacity fade for maximum smoothness */}
      <div className="relative min-h-[5rem] sm:min-h-[6rem] md:min-h-[7rem] lg:min-h-[9rem] flex items-center justify-center">
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit   ={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className={`
                font-display font-black grad-text leading-none tracking-tight text-center
                ${isNonLatin
                  ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                  : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'}
              `}
              style={{ willChange: 'opacity' }}
            >
              {current.text}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Language label */}
      <div className="mt-5 flex items-center gap-3 h-4">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60" />
        {mounted && (
          <AnimatePresence mode="wait">
            <motion.span
              key={`lbl-${idx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit   ={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/70 font-medium min-w-[80px] text-center"
              style={{ willChange: 'opacity' }}
            >
              {current.lang}
            </motion.span>
          </AnimatePresence>
        )}
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/60" />
      </div>
    </div>
  )
}

/* ============================================
   SHIMMER TEXT (for logo section)
   ============================================ */
function ShimmerText({ children, className = '' }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/60 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent pointer-events-none"
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  )
}

/* ============================================
   DATA
   ============================================ */
const clientLogos  = ['Microsoft','Stripe','Shopify','Vercel','Linear','Notion','Figma','Supabase','Webflow','Framer']
const clientLogos2 = ['OpenAI','GitHub','Slack','Discord','Spotify','Airbnb','Uber','Netflix','Adobe','Dribbble']

const services = [
  { icon: Clapperboard,   title: 'Motion Graphics Design', tags: ['Microinteractions','UI Animation','Storyboarding'],          desc: 'Bring your brand to life with scroll-driven cinema, micro-interactions, and motion that makes users feel something.' },
  { icon: PenTool,        title: 'Branding',               tags: ['Logo Design','Style Guide','Typography','Brand Guideline'],   desc: 'Identity systems and visual languages that scale from favicon to flagship keynote.' },
  { icon: Palette,        title: 'UI/UX Design',           tags: ['Wireframes','Prototypes','Design System'],                   desc: 'User-centered design that balances beauty with usability. Every pixel has a purpose.' },
  { icon: Code,           title: 'Web Development',        tags: ['API Development','CMS','Back-end'],                          desc: 'Full-stack engineering with modern frameworks. Fast, accessible, and built to scale.' },
  { icon: Globe,          title: 'Web Design',             tags: ['Navigation','User Flow','Sitemap','UI UX'],                  desc: 'Marketing sites and digital experiences that convert visitors into customers.' },
  { icon: MonitorPlay,    title: 'WordPress Development',  tags: ['Custom Dev','Plugin','Headless'],                            desc: 'Enterprise WordPress that actually performs. Custom themes, headless architectures.' },
  { icon: LayoutDashboard,title: 'SaaS Web & App Design',  tags: ['Dashboard UI','Data Viz','Admin Panel'],                     desc: 'Complex data made simple. Dashboards, analytics, and admin panels that users love.' },
  { icon: ShoppingCart,   title: 'Shopify Development',    tags: ['Product Page','Checkout','CRO'],                             desc: 'Commerce experiences optimized for conversion. Every click counts.' },
  { icon: Smartphone,     title: 'Mobile App Design',      tags: ['Wireframes','Prototypes','Usability Testing'],               desc: 'Native-feel mobile experiences designed for engagement and retention.' },
  { icon: Layers,         title: 'Webflow Development',    tags: ['Responsive','No-Code','UI'],                                 desc: 'Pixel-perfect Webflow builds with clean interactions and CMS-powered content.' },
]

const portfolioFilters = ['All','Website Design','Web Development','UI/UX Design','WordPress','Mobile App','SaaS','Webflow','Branding','Motion Graphics']

const portfolioWork = [
  { title:'Sixpay',      tag:'Fintech · SaaS',          filters:['SaaS','UI/UX Design','Web Development'],          tools:['figma','next.js'],   color:'from-blue-500 to-cyan-400',      desc:'A next-gen payment platform with real-time analytics dashboard and seamless checkout flow.' },
  { title:'Userpath',    tag:'Product · Design System',  filters:['UI/UX Design','SaaS','Web Development'],          tools:['figma','react'],     color:'from-violet-500 to-blue-500',    desc:'User analytics tool with comprehensive design system powering 200+ screens.' },
  { title:'Sereni Mind', tag:'Health · Mobile App',      filters:['Mobile App','UI/UX Design','Branding'],           tools:['figma','flutter'],   color:'from-emerald-400 to-cyan-400',   desc:'Mental health companion app with calming UI and AI-powered mood tracking.' },
  { title:'Webtool',     tag:'SaaS · Web App',           filters:['SaaS','Web Development','Webflow'],               tools:['webflow','figma'],   color:'from-pink-500 to-violet-500',    desc:'All-in-one web development toolkit with drag-and-drop interface builder.' },
  { title:'Northline OS',tag:'Product · Motion',         filters:['UI/UX Design','Motion Graphics','Web Development'],tools:['three.js','next.js'],color:'from-indigo-500 to-blue-600',   desc:'Operating system dashboard with cinematic scroll animations and 3D transitions.' },
  { title:'CraftBrew',   tag:'E-Commerce · Shopify',     filters:['Website Design','WordPress'],                     tools:['shopify','figma'],   color:'from-amber-400 to-orange-500',   desc:'Premium craft brewery e-commerce with immersive product storytelling.' },
]

const testimonials = [
  { q:'They shipped a marketing site that made our seed round feel like a Series C. The scroll animation alone is worth the price.', n:'Sofia Ren',    r:'Co-founder, Halcyon Labs', c:'from-blue-500 to-cyan-400',    letter:'S' },
  { q:'The team operates like a design engineering hive-mind. Figma to production in days, not months. Absurd taste.',              n:'Marcus Vale',  r:'Head of Product, Northline', c:'from-violet-500 to-blue-500',  letter:'M' },
  { q:'We hired them to build a landing page. They gave us a category. The launch trended on Product Hunt for a week.',             n:'Ava Chen',     r:'CEO, Prism Cloud',           c:'from-cyan-400 to-emerald-400', letter:'A' },
  { q:"I've worked with a dozen studios. StandoutDev is the only one where every deliverable made me want to send it to friends.", n:'Rio Okafor',   r:'Founder, Nova AI',           c:'from-pink-500 to-violet-500',  letter:'R' },
]

const stats = [
  { value:200, suffix:'+',   label:'Projects Delivered' },
  { value:50,  suffix:'+',   label:'Team size'          },
  { value:92,  suffix:'%',   label:'Client satisfaction'},
  { value:15,  suffix:'+',   label:'Industries served'  },
  { value:48,  suffix:'hr',  label:'Avg kickoff time'   },
  { value:2,   suffix:'B+', prefix:'$', label:'Revenue influenced' },
]

const processSteps = [
  { n:'01', title:'Discovery',    desc:'Project discovery phase and initial UX strategy mapping workshop.' },
  { n:'02', title:'Research',     desc:'Competitive analysis, user research, and insights synthesis.' },
  { n:'03', title:'UI/UX Design', desc:'Wireframes, prototyping, design systems, and user testing.' },
  { n:'04', title:'Development',  desc:'Clean, performant code using modern frameworks and best practices.' },
  { n:'05', title:'QA Testing',   desc:'Cross-browser testing, performance audits, and accessibility checks.' },
  { n:'06', title:'Launch',       desc:'Deployment, monitoring, and post-launch optimization sprints.' },
]

const faqs = [
  { q:'What UI/UX design services does StandoutDev offer?',    a:'We offer end-to-end UI/UX design including wireframing, prototyping, user research, design systems, usability testing, and high-fidelity UI design for web, mobile, and SaaS platforms.' },
  { q:'How does StandoutDev approach a new project?',          a:'Every project starts with a Discovery phase — we map your goals, audience, and competitive landscape. Then we move through Research, Design, Development, QA, and Launch in structured sprints with weekly reviews.' },
  { q:'How long does a typical engagement take?',              a:'Marketing sites and brand launches run 6–10 weeks. Full product engagements are usually 3–6 months. We scope tightly and ship in phases.' },
  { q:'Do you work with early-stage startups?',                a:'Yes — roughly half our work is pre-Series-A. We love shaping v1 with founders who care about how their thing feels.' },
  { q:'What tech stack do you build in?',                      a:'Next.js, React, Three.js, and Framer Motion for the front. Sanity or Payload for content. Vercel for hosting. We fit into your stack when you have one.' },
  { q:'Do you offer ongoing support after launch?',            a:'Absolutely. Most clients continue with us on a retainer for evolution, campaigns, and new features.' },
  { q:'Can you work with our in-house team?',                  a:'Yes — we frequently embed with in-house design and eng teams. We can lead, support, or pair, depending on your needs.' },
  { q:'How do you handle pricing?',                            a:"We scope each engagement based on ambition and outcomes, not hours. We'll share a range on the first call and a firm number after discovery." },
]

/* ============================================
   SUB-COMPONENTS
   ============================================ */
function FAQItem({ q, a, i, openIndex, setOpenIndex }) {
  const isOpen = openIndex === i
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.5, delay: i*0.04 }}
      className="border-t border-white/10"
    >
      <button
        onClick={() => setOpenIndex(isOpen ? -1 : i)}
        className="w-full py-6 flex items-center justify-between text-left gap-6 group"
      >
        <span className="font-display text-lg md:text-xl font-semibold group-hover:text-cyan-300 transition-colors leading-snug">{q}</span>
        <span className={`shrink-0 h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-[#0a0e27] border-cyan-400 rotate-180' : 'border-white/15 hover:border-white/30'}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-white/55 leading-relaxed max-w-3xl">{a}</p>
        </div>
      </div>
    </motion.div>
  )
}

function PortfolioCard({ w, i }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-80px' }}
      transition={{ duration:0.7, delay: i*0.08, ease:[0.7,0,0.2,1] }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/3] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${w.color} opacity-80 transition-opacity duration-500 group-hover:opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,39,0.5)_100%)]" />
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="h-32 w-52 rounded-xl bg-black/30 backdrop-blur-md border border-white/15 group-hover:scale-110 transition-transform duration-700 shadow-2xl" />
      </div>
      <div className="absolute top-5 left-5 flex gap-2">
        {w.tools.map((t) => <span key={t} className="tag-pill text-[0.65rem]">{t}</span>)}
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="text-xs uppercase tracking-widest text-white/60 mb-1">{w.tag}</div>
        <div className="font-display text-2xl md:text-3xl font-bold">{w.title}</div>
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration:0.3 }}
          className="mt-3"
        >
          <p className="text-sm text-white/70 leading-relaxed mb-3">{w.desc}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-300">
            See Full Project <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </motion.div>
      </div>
      <ArrowUpRight className="absolute top-5 right-5 h-5 w-5 opacity-60 group-hover:rotate-45 transition-transform duration-500" />
    </motion.div>
  )
}

/* ============================================
   CONTACT FORM
   ============================================ */
function ContactFormEmbed() {
  const [form, setForm]           = useState({ name:'', email:'', details:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const update = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }))
    if (error) setError('')
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setSubmitted(true)
    } catch { setError('Could not send. Please try again, or email us at standoutdevsolutions@gmail.com') }
    finally   { setLoading(false) }
  }

  if (submitted) return (
    <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
      className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-12 text-center">
      <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6">
        <ArrowUpRight className="h-7 w-7 text-[#0a0e27]" />
      </div>
      <h3 className="font-display text-3xl font-bold">Message received!</h3>
      <p className="mt-4 text-white/55">We'll reply within one business day.</p>
    </motion.div>
  )

  return (
    <form onSubmit={submit} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/40">Name</label>
          <input required value={form.name} onChange={update('name')}
            className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition placeholder:text-white/20"
            placeholder="Your name" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/40">Email</label>
          <input required type="email" value={form.email} onChange={update('email')}
            className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition placeholder:text-white/20"
            placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-white/40">Project Details</label>
        <textarea required rows={4} value={form.details} onChange={update('details')}
          className="mt-2 w-full bg-transparent border-b border-white/15 py-3 text-lg focus:outline-none focus:border-cyan-300 transition resize-none placeholder:text-white/20"
          placeholder="Tell us about your project, timeline, and budget..." />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={loading}
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition disabled:opacity-50 shadow-lg shadow-blue-500/25">
        {loading ? 'Sending…' : 'Send Message'}
        {!loading && <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />}
      </button>
      <p className="text-xs text-white/30">
        Or email us directly at{' '}
        <a href="mailto:standoutdevsolutions@gmail.com" className="text-cyan-300/60 hover:text-cyan-300 transition">
          standoutdevsolutions@gmail.com
        </a>
      </p>
    </form>
  )
}

/* ============================================
   PAGE
   ============================================ */
export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [faqOpen, setFaqOpen]           = useState(0)

  const filteredWork = activeFilter === 'All'
    ? portfolioWork
    : portfolioWork.filter((w) => w.filters.includes(activeFilter))

  return (
    <>
      {/* ==== Local styles for pure-CSS animations ==== */}
      <style jsx global>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>

      {/* ======================================================
          HERO — smooth, minimal, cinematic
         ====================================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* — layered backgrounds (static, zero animation cost) — */}
        <div className="absolute inset-0 bg-[#060920]" />
        <ParticleField />
        <div className="absolute inset-0 bg-aurora opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(56,130,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_48%,rgba(34,211,238,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 grid-lines opacity-[0.03]" />

        {/* orbit rings (pure CSS, GPU) */}
        <OrbitRings />

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full">

          {/* badge */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.15, ease: 'easeOut' }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-white/50">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Design &amp; Development Studio
            </span>
          </motion.div>

          {/* ★ Rotating multilingual name (star of the show) */}
          <motion.div
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.35, ease: 'easeOut' }}
            className="mb-8 w-full"
          >
            <RotatingBrandName />
          </motion.div>

          {/* tagline */}
          <motion.p
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.6, ease: 'easeOut' }}
            className="text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed mb-10"
          >
            We design &amp; build digital products that speak every language —
            brands, websites, and apps that stand out across cultures and markets.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.75, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 font-semibold text-[#0a0e27] hover:scale-[1.04] transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-cyan-400/40">
              Start Your Project
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-white/80 hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300">
              Explore Our Work
              <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
            </Link>
          </motion.div>

          {/* mini stats */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.9, ease: 'easeOut' }}
            className="mt-16 flex flex-wrap items-center justify-center gap-10 md:gap-14"
          >
            {[
              { val:'200+', label:'Projects'   },
              { val:'50+',  label:'Creatives'  },
              { val:'15+',  label:'Industries' },
              { val:'4.9★', label:'Rating'     },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold grad-text">{s.val}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.45em] text-white/20">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/20 animate-bounce" style={{ animationDuration: '2s' }} />
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a0e27] to-transparent pointer-events-none" />
      </section>

      {/* ======================================================
          🌟 LOGO SHOWCASE — Two-column with glowing platform 🌟
         ====================================================== */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#060920] to-[#0a0e27]">

        <div className="absolute inset-0 grid-lines opacity-[0.04]" />
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[130px]" />
        <div className="absolute -right-40 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.06] blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* LEFT — Text */}
            <div className="flex flex-col items-start text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity:0, x:-30 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.03] backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Our Identity
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.8, delay:0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6"
              >
                We Build{' '}
                <span className="grad-text">Products</span>
                <br />
                That{' '}
                <span className="relative inline-block">
                  <ShimmerText className="grad-text">Stand Out.</ShimmerText>
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.8, delay:0.25 }}
                className="text-lg text-white/55 leading-relaxed max-w-xl mb-8"
              >
                A symbol forged from ambition and craft. Our logo is more than a
                mark — it's a promise that whatever we ship will be worth
                remembering.
              </motion.p>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once:true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
                }}
                className="space-y-3 mb-10"
              >
                {[
                  { label: 'Bold', desc: 'Confidence baked into every pixel' },
                  { label: 'Modular', desc: 'Two forms working as one system' },
                  { label: 'Timeless', desc: 'Designed to last across decades' },
                ].map((item) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] group-hover:scale-150 transition-transform" />
                    <div>
                      <span className="font-display text-lg font-bold text-white/90 mr-2">{item.label}.</span>
                      <span className="text-white/50">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7, delay:0.7 }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm px-7 py-3.5 font-semibold text-white/85 hover:bg-white/[0.07] hover:border-cyan-400/30 transition-all"
                >
                  Learn Our Story
                  <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — Logo on Glowing Platform (FIXED CENTERING) */}
            <motion.div
              initial={{ opacity:0, scale:0.9 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ duration:1, ease:[0.7,0,0.2,1] }}
              className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] order-1 lg:order-2"
            >
              {/* Ambient radial glow — centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="h-[450px] w-[450px] md:h-[550px] md:w-[550px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(34,211,238,0.18) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'soft-pulse 4s ease-in-out infinite',
                    willChange: 'opacity, transform',
                  }}
                />
              </div>

              {/* Rotating outer ring — centered via flex */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="relative rounded-full border border-cyan-400/15"
                  style={{
                    width: 480, height: 480,
                    animation: 'orbit 50s linear infinite',
                    willChange: 'transform',
                  }}
                >
                  <div
                    className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-cyan-400"
                    style={{ marginLeft: -4, boxShadow: '0 0 15px rgba(34,211,238,1)' }}
                  />
                </div>
              </div>

              {/* THE 3D LOGO — perfectly centered */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-full h-full">
                  <Logo3DScene />
                </div>
              </div>

              {/* Platform — truly centered horizontally via flex */}
              <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center pointer-events-none">
                <div className="relative">
                  {/* Bloom */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 h-40 w-64 rounded-full bg-cyan-400/40 blur-[60px]" />
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 h-24 w-40 rounded-full bg-blue-400/50 blur-[40px]" />

                  {/* Ring 1 — outermost (has real width, anchors the rest) */}
                  <div
                    className="h-2 w-[360px] md:w-[440px] rounded-full"
                    style={{
                      border: '2px solid rgba(34,211,238,0.35)',
                      boxShadow: '0 0 30px rgba(34,211,238,0.4)',
                      animation: 'soft-pulse 2.5s ease-in-out infinite',
                      willChange: 'opacity, transform',
                    }}
                  />

                  {/* Ring 2 — mid */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-2 h-1.5 w-[280px] md:w-[340px] rounded-full"
                    style={{
                      border: '1.5px solid rgba(96,165,250,0.5)',
                      boxShadow: '0 0 20px rgba(96,165,250,0.5)',
                      animation: 'soft-pulse 2s ease-in-out infinite',
                      animationDelay: '0.4s',
                      willChange: 'opacity, transform',
                    }}
                  />

                  {/* Ring 3 — brightest inner */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-4 h-1 w-[200px] md:w-[240px] rounded-full"
                    style={{
                      border: '1px solid rgba(34,211,238,0.9)',
                      boxShadow: '0 0 15px rgba(34,211,238,0.8), inset 0 0 10px rgba(34,211,238,0.6)',
                      animation: 'soft-pulse 1.5s ease-in-out infinite',
                      animationDelay: '0.8s',
                      willChange: 'opacity, transform',
                    }}
                  />

                  {/* Center bright bar */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-4 h-1 w-16 rounded-full bg-white"
                    style={{
                      boxShadow: '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(34,211,238,0.8)',
                      animation: 'soft-pulse 1.8s ease-in-out infinite',
                      willChange: 'opacity, transform',
                    }}
                  />
                </div>
              </div>

              {/* Vertical light beam — centered via flex */}
              <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center pointer-events-none">
                <div
                  className="w-1 h-64 rounded-full -mt-64"
                  style={{
                    background: 'linear-gradient(to top, rgba(34,211,238,0.6), transparent)',
                    filter: 'blur(4px)',
                    animation: 'soft-pulse 2.5s ease-in-out infinite',
                    willChange: 'opacity, transform',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CinematicLaptop/>

      {/* ====== LOGO MARQUEE ====== */}
      <section className="relative py-16 border-y border-white/5 bg-[#080b23]">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-white/35 mb-8">
          Trusted by teams shipping the future
        </p>
        <div className="overflow-hidden mb-6">
          <div className="marquee-track gap-16 pr-16">
            {[...clientLogos, ...clientLogos].map((l,i) => (
              <span key={`r1-${i}`} className="font-display text-2xl md:text-3xl font-semibold text-white/15 hover:text-white/60 transition-colors duration-300 whitespace-nowrap">{l}</span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse gap-16 pr-16">
            {[...clientLogos2, ...clientLogos2].map((l,i) => (
              <span key={`r2-${i}`} className="font-display text-2xl md:text-3xl font-semibold text-white/15 hover:text-white/60 transition-colors duration-300 whitespace-nowrap">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
        <div className="absolute -left-40 bottom-40 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">What we do</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]">
                Everything you need,<br />
                <span className="grad-text">all in one studio.</span>
              </h2>
            </div>
            <div className="md:col-span-5 text-white/55 leading-relaxed text-lg">
              From strategy to launch — we design and build brands, websites, mobile apps,
              and SaaS platforms that stand out in crowded markets.
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.title}
                  initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-60px' }}
                  transition={{ duration:0.6, delay: i*0.04, ease:[0.7,0,0.2,1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-500"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon className="h-7 w-7 text-cyan-300 mb-5 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
                  </div>
                  <p className="text-white/50 leading-relaxed text-sm">{s.desc}</p>
                  <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-white/20 group-hover:text-cyan-300 transition-colors duration-300" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====== PORTFOLIO ====== */}
      <section className="relative py-32 bg-[#080b23] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Our portfolio</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold">
                Recent <span className="grad-text">obsessions.</span>
              </h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold link-underline text-white/70 hover:text-white">
              View All Work <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {portfolioFilters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${activeFilter === f ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-[#0a0e27]' : 'border border-white/10 text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.04]'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {filteredWork.map((w, i) => <PortfolioCard key={w.title} w={w} i={i} />)}
          </div>
          {filteredWork.length === 0 && (
            <div className="text-center py-20 text-white/40">
              <p className="font-display text-2xl">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Kind words</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold">
                Words from the People<br />
                <span className="grad-text">We've Worked With.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_,i) => <Star key={i} className="h-5 w-5 fill-cyan-300 text-cyan-300" />)}
              <span className="ml-2 text-white/50 text-sm">4.9 / 5 across 200+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.n}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-60px' }}
                transition={{ duration:0.6, delay: i*0.06 }}
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 group hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${t.c} opacity-[0.06] blur-3xl group-hover:opacity-[0.12] transition-opacity duration-500`} />
                <Quote className="h-8 w-8 text-cyan-300/40 mb-6" />
                <p className="text-lg md:text-xl leading-snug font-display font-medium text-white/90">{t.q}</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.c} flex items-center justify-center font-display font-bold text-[#0a0e27]`}>{t.letter}</div>
                  <div>
                    <div className="font-semibold">{t.n}</div>
                    <div className="text-sm text-white/45">{t.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/35">200+ Happy Customers based on complement and customer reviews</p>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="relative py-32 border-y border-white/5 bg-gradient-to-b from-[#080b23] to-[#0a0e27]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Strategy</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Why brands choose StandoutDev for{' '}
              <span className="grad-text">design &amp; development</span>?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay: i*0.06 }}
                className="text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold grad-text">
                  <CountUp end={s.value} suffix={s.suffix} prefix={s.prefix || ''} />
                </div>
                <div className="mt-2 text-sm text-white/45">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PROCESS ====== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-violet-500/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Our process</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold">
              How We <span className="grad-text">Get It Done.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div key={step.n}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.6, delay: i*0.08 }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-cyan-400/20 transition-all duration-500"
              >
                <div className="font-mono text-5xl font-bold text-white/[0.06] absolute top-4 right-6 group-hover:text-cyan-300/10 transition-colors">{step.n}</div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="font-mono text-sm font-bold text-cyan-300">{step.n}</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute top-10 left-[20%] h-64 w-64 rounded-full bg-blue-500/15 blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-[20%] h-48 w-48 rounded-full bg-cyan-400/10 blur-[80px] animate-float" style={{ animationDelay:'-3s' }} />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Let's talk</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            Consult strategy to build<br />
            <span className="grad-text">stronger product.</span>
          </h2>
          <p className="mt-8 text-white/50 text-lg max-w-2xl mx-auto">
            30 minutes to understand your product, uncover the real problems,
            and map the path to a solution that actually moves the needle.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 font-semibold text-[#0a0e27] hover:scale-[1.03] transition shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/40">
              Book a Free Consultation
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="relative py-32 bg-[#080b23]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Frequently asked</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold">
              Got Questions?<br />
              <span className="grad-text">Let's Clear Things Up.</span>
            </h2>
          </div>
          <div>
            {faqs.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} i={i} openIndex={faqOpen} setOpenIndex={setFaqOpen} />
            ))}
            <div className="border-t border-white/10" />
          </div>
          <div className="mt-10 text-center">
            <Link href="/faq" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5 transition">
              See All FAQs <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CONTACT FORM ====== */}
      <section className="relative py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Start your project</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold">
              Let's Talk About<br />
              <span className="grad-text">Your Project.</span>
            </h2>
          </div>
          <ContactFormEmbed />
        </div>
      </section>
    </>
  )
}