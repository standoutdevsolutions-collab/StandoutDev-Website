'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight, ArrowRight, CheckCircle, Star,
  Zap, Target, Shield, HeartHandshake, TrendingUp,
  Clock, Code2, Palette, Users, Award, Globe,
  Rocket, Lightbulb, Heart, MessageSquare,
} from 'lucide-react'

/* ============================================
   CONSTANTS
============================================ */
const E = [0.22, 1, 0.36, 1]
const BG = '#020617'
const BGA = '#050d1f'
const gT = {
  background: 'linear-gradient(135deg,#60a5fa 0%,#06b6d4 50%,#818cf8 100%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  WebkitTextFillColor: 'transparent', color: 'transparent',
}
const wT = {
  background: 'linear-gradient(180deg,#fff 0%,#cbd5e1 100%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}
const LBL = {
  fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em',
  color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600,
}
const HD = {
  fontWeight: 900, lineHeight: 1.02,
  letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem,5vw,3.8rem)',
}
const BD = { color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 'clamp(0.9rem,1.3vw,1rem)' }

/* ============================================
   DATA — Real StandoutDev content
============================================ */
const principles = [
  {
    n: '01',
    icon: Target,
    t: 'Results over aesthetics',
    d: 'Beautiful design that doesn\'t convert is decoration. Every design decision we make is tied to a measurable outcome — more inquiries, lower bounce rate, higher retention.',
  },
  {
    n: '02',
    icon: Code2,
    t: 'Design and code, together',
    d: 'We don\'t hand off wireframes to developers and hope for the best. Our designers think in components, and our developers care about visual quality. One team, one vision.',
  },
  {
    n: '03',
    icon: Clock,
    t: 'Speed without shortcuts',
    d: 'Most agencies take 3–6 months. We ship in 4–8 weeks. Not because we cut corners — because we have a proven process and we don\'t waste time in unnecessary meetings.',
  },
  {
    n: '04',
    icon: Heart,
    t: 'Ownership and transparency',
    d: 'You own everything we build — code, designs, assets. We give you weekly updates, honest timelines, and clear communication. No surprises, no lock-in.',
  },
]

const milestones = [
  {
    y: '2022',
    t: 'StandoutDev founded',
    d: 'Started with a simple mission: build websites that actually stand out. First client was a local business in Rajkot that needed more than a template.',
  },
  {
    y: '2023',
    t: 'First 5 projects shipped',
    d: 'Expanded beyond local clients. Delivered manufacturing websites, education platforms, and agency sites. Learned what works and what doesn\'t.',
  },
  {
    y: '2024',
    t: 'Results started speaking',
    d: 'Uma Metal Craft saw 3× more inquiries. Siddhanath Physics enrolled 150+ students. Digital Developers generated 5× more leads. The proof was in the numbers.',
  },
  {
    y: '2025',
    t: 'Growing with purpose',
    d: 'Now serving clients across manufacturing, education, and digital agencies. Building systems, not just websites — design systems, brand systems, growth systems.',
  },
]

const values = [
  { icon: Zap,          t: 'Ship fast, iterate faster',  d: 'We move quickly and learn from real users. Speed is a feature, not a shortcut.' },
  { icon: Target,       t: 'Every pixel has a purpose',  d: 'We don\'t add animations or elements that don\'t serve the user or the goal.' },
  { icon: Shield,       t: 'You own everything',          d: 'All source code, all design files, all assets — yours from day one. No lock-in ever.' },
  { icon: MessageSquare,t: 'Radical transparency',        d: 'Weekly updates, honest timelines, clear scope. You\'ll never wonder what\'s happening.' },
  { icon: TrendingUp,   t: 'Measure what matters',        d: 'We track load times, conversion rates, and bounce rates — not just aesthetics.' },
  { icon: HeartHandshake,t:'Long-term thinking',          d: 'We build relationships, not just projects. Most clients come back for their next thing.' },
]

const stats = [
  { v: '15+',  l: 'Projects delivered',   icon: Rocket },
  { v: '10+',  l: 'Happy clients',         icon: Users },
  { v: '95%',  l: 'Satisfaction rate',     icon: Star },
  { v: '4–8',  l: 'Weeks to launch',       icon: Clock },
  { v: '100',  l: 'Avg Lighthouse score',  icon: Zap },
  { v: '3+',   l: 'Industries served',     icon: Globe },
]

const testimonials = [
  {
    q: 'StandoutDev transformed our online presence completely. The new website tripled our inquiry rate. Professional, fast, and exactly what we needed.',
    n: 'Uma Metal Craft', r: 'Manufacturing, Rajkot',
    c: 'from-amber-500 to-orange-600', letter: 'U',
  },
  {
    q: 'Enrollment went up significantly after launch. The platform is clean, loads instantly, and students actually enjoy using it. Incredible work.',
    n: 'Siddhanath Krupa Physics', r: 'Education Institute',
    c: 'from-blue-500 to-indigo-600', letter: 'S',
  },
  {
    q: 'Cinematic animations, perfect performance score. Clients now call us premium because of the website StandoutDev built. Worth every rupee.',
    n: 'Digital Developers', r: 'Digital Agency',
    c: 'from-violet-500 to-purple-600', letter: 'D',
  },
]

/* ============================================
   SHIMMER TEXT
============================================ */
const ShimmerText = memo(function ShimmerText({ children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <motion.span
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          backgroundImage: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          WebkitTextFillColor: 'transparent', pointerEvents: 'none',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >{children}</motion.span>
    </span>
  )
})

/* ============================================
   ABOUT PAGE
============================================ */
function About() {
  return (
    <>
      <style jsx global>{`
        @keyframes soft-pulse {
          0%,100%{opacity:.6;transform:scale(1)}
          50%{opacity:1;transform:scale(1.06)}
        }
        .pg-orb {
          position:absolute;border-radius:50%;
          filter:blur(80px);pointer-events:none;
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section style={{
        position: 'relative',
        paddingTop: 'clamp(120px,18vw,180px)',
        paddingBottom: 'clamp(64px,8vw,100px)',
        overflow: 'hidden', background: BG,
      }}>
        <div className="pg-orb" style={{ top:'-10%', left:'8%', width:520, height:520, background:'radial-gradient(circle,rgba(37,99,235,.14) 0%,transparent 70%)' }} />
        <div className="pg-orb" style={{ bottom:'-5%', right:'5%', width:400, height:400, background:'radial-gradient(circle,rgba(6,182,212,.09) 0%,transparent 70%)' }} />
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(148,163,184,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.022) 1px,transparent 1px)',
          backgroundSize:'60px 60px',
          maskImage:'radial-gradient(ellipse at center,black 20%,transparent 70%)',
          WebkitMaskImage:'radial-gradient(ellipse at center,black 20%,transparent 70%)',
          pointerEvents:'none',
        }} />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, ease:E }} style={{ marginBottom:24 }}
          >
            <span style={{
              display:'inline-flex', alignItems:'center', gap:10,
              padding:'7px 16px 7px 7px', borderRadius:100,
              background:'rgba(255,255,255,.03)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(255,255,255,.06)',
            }}>
              <span style={{
                width:6, height:6, borderRadius:'50%', background:'#06b6d4',
                boxShadow:'0 0 8px rgba(6,182,212,.7)',
                animation:'soft-pulse 2.5s ease-in-out infinite',
              }} />
              <span style={{ fontSize:10, fontWeight:700, color:'#60a5fa', letterSpacing:'.12em', textTransform:'uppercase' }}>
                About StandoutDev
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.1, ease:E }}
            style={{ ...HD, fontSize:'clamp(2.5rem,6vw,4.8rem)', marginBottom:20 }}
          >
            <span style={wT}>A studio obsessed with</span><br />
            <ShimmerText><span style={gT}>results, not just looks.</span></ShimmerText>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.2, ease:E }}
            style={{ ...BD, maxWidth:580, marginBottom:32 }}
          >
            StandoutDev is a design and development studio based in India. We build websites and digital
            products that don&apos;t just look great — they convert visitors, retain users, and drive
            real business outcomes. No fluff. No templates. No compromises.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.3, ease:E }}
            style={{ display:'flex', gap:12, flexWrap:'wrap' }}
          >
            <Link href="/work" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              borderRadius:100, padding:'12px 24px', fontWeight:600, fontSize:14,
              background:'linear-gradient(135deg,#2563eb,#0891b2)', color:'#fff',
              textDecoration:'none', boxShadow:'0 4px 24px rgba(59,130,246,0.3)',
              transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}>
              See Our Work <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" style={{
              display:'inline-flex', alignItems:'center', gap:7,
              borderRadius:100, padding:'12px 22px', fontWeight:600, fontSize:14,
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
              color:'rgba(255,255,255,0.8)', textDecoration:'none',
              transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}>
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.45, ease:E }}
            style={{
              display:'flex', gap:'clamp(20px,4vw,48px)',
              marginTop:'clamp(40px,5vw,64px)', flexWrap:'wrap',
            }}
          >
            {[
              { v:'2022', l:'Founded' },
              { v:'15+', l:'Projects shipped' },
              { v:'95%', l:'Client satisfaction' },
              { v:'3+', l:'Industries' },
            ].map((s) => (
              <div key={s.l} style={{ display:'flex', flexDirection:'column' }}>
                <span style={{ fontSize:'clamp(1.3rem,2.5vw,1.8rem)', fontWeight:900, ...gT }}>{s.v}</span>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:2 }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ WHO WE ARE ══════════ */}
      <section style={{
        position:'relative', padding:'clamp(64px,8vw,112px) 0',
        background:BGA, overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="pg-orb" style={{ top:60, right:'-8%', width:380, height:380, background:'radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 70%)' }} />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.8, ease:E }}
            >
              <p style={LBL}>Who we are</p>
              <h2 style={HD}>
                <span style={wT}>We build websites that </span>
                <span style={gT}>actually work.</span>
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:16, marginTop:20 }}>
                <p style={BD}>
                  StandoutDev was founded with one belief: most websites are built to look good in screenshots,
                  not to generate real results. We set out to change that.
                </p>
                <p style={BD}>
                  We&apos;re a focused team of designers and developers who work closely with every client —
                  no outsourcing, no account managers, no diluted vision. When you work with us,
                  you work directly with the people building your product.
                </p>
                <p style={BD}>
                  Our clients are manufacturers, educators, agencies, and founders who need more than
                  a pretty website. They need something that drives inquiries, earns trust, and converts.
                </p>
              </div>

              {/* Highlights */}
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:24 }}>
                {[
                  'Based in India, working with clients nationwide',
                  'Every project scoped to your specific goals',
                  'Full ownership of all deliverables from day one',
                  'Direct communication — no middlemen',
                ].map((item) => (
                  <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                    <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color:'rgba(96,165,250,0.7)', marginTop:2 }} />
                    <span style={{ fontSize:14, color:'rgba(255,255,255,0.65)', lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — visual block */}
            <motion.div
              initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.8, delay:0.1, ease:E }}
            >
              {/* Stats grid */}
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr',
                gap:12, marginBottom:12,
              }}>
                {stats.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.div
                      key={s.l}
                      initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                      viewport={{ once:true }} transition={{ duration:0.55, delay:i*0.06, ease:E }}
                      style={{
                        borderRadius:16,
                        border:'1px solid rgba(255,255,255,0.06)',
                        background:'rgba(255,255,255,0.025)',
                        padding:'clamp(16px,2.5vw,24px)',
                        display:'flex', flexDirection:'column',
                        transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                      }}
                      className="hover:bg-white/[0.04] hover:border-white/[0.1]"
                    >
                      <Icon className="h-4 w-4 mb-3" style={{ color:'rgba(96,165,250,0.6)' }} />
                      <span style={{ fontSize:'clamp(1.4rem,3vw,1.9rem)', fontWeight:900, lineHeight:1, ...gT }}>
                        {s.v}
                      </span>
                      <span style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:5 }}>{s.l}</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Mission card */}
              <div style={{
                borderRadius:16, padding:'clamp(18px,3vw,28px)',
                border:'1px solid rgba(96,165,250,0.1)',
                background:'linear-gradient(135deg,rgba(37,99,235,0.06) 0%,rgba(6,182,212,0.03) 100%)',
                position:'relative', overflow:'hidden',
              }}>
                <div style={{
                  position:'absolute', top:0, left:0, right:0, height:2,
                  background:'linear-gradient(135deg,#60a5fa,#06b6d4)',
                  opacity:0.5,
                }} />
                <p style={{ fontSize:11, fontWeight:700, color:'rgba(96,165,250,0.6)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10 }}>
                  Our mission
                </p>
                <p style={{ fontSize:'clamp(0.95rem,1.5vw,1.1rem)', fontWeight:600, color:'rgba(255,255,255,0.85)', lineHeight:1.55 }}>
                  &ldquo;Every business deserves a website that works as hard as they do.
                  We make that possible — without the agency price tag or the 6-month timeline.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ PRINCIPLES ══════════ */}
      <section style={{
        position:'relative', padding:'clamp(64px,8vw,112px) 0',
        background:BG, overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="pg-orb" style={{ top:80, left:'-8%', width:360, height:360, background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 70%)' }} />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <p style={LBL}>How we work</p>
              <h2 style={HD}>
                <span style={wT}>Principles that </span>
                <span style={gT}>guide every project.</span>
              </h2>
              <p style={{ ...BD, marginTop:14, maxWidth:380, fontSize:14 }}>
                These aren&apos;t values on a wall. They&apos;re the actual decisions we make every day — in design reviews, client calls, and code.
              </p>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {principles.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.n}
                  initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-60px' }}
                  transition={{ duration:0.65, delay:i*0.06, ease:E }}
                  style={{
                    display:'grid', gridTemplateColumns:'auto 1fr auto',
                    gap:'clamp(16px,3vw,40px)', alignItems:'start',
                    padding:'clamp(20px,3vw,32px) 0',
                    borderTop:'1px solid rgba(255,255,255,0.06)',
                    transition:'background 0.4s ease',
                  }}
                  className="group"
                >
                  {/* Number + icon */}
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, width:48 }}>
                    <div style={{
                      width:42, height:42, borderRadius:12,
                      background:'rgba(255,255,255,0.03)',
                      border:'1px solid rgba(255,255,255,0.07)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                    }} className="group-hover:border-blue-400/20 group-hover:bg-blue-500/05">
                      <Icon className="h-4 w-4" style={{ color:'rgba(96,165,250,0.6)' }} />
                    </div>
                    <span style={{ fontFamily:'monospace', fontSize:10, fontWeight:700, color:'rgba(96,165,250,0.4)' }}>
                      {p.n}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 style={{
                      fontSize:'clamp(1.1rem,2.2vw,1.5rem)', fontWeight:800,
                      color:'rgba(255,255,255,0.92)', marginBottom:8,
                      letterSpacing:'-0.02em',
                    }}>
                      {p.t}
                    </h3>
                    <p style={{ ...BD, fontSize:14, maxWidth:560 }}>{p.d}</p>
                  </div>

                  {/* Arrow indicator */}
                  <div style={{
                    width:32, height:32, borderRadius:'50%',
                    border:'1px solid rgba(255,255,255,0.06)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    opacity:0, transform:'translateX(-8px)',
                    transition:'all 0.4s ease',
                    alignSelf:'center',
                  }} className="group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color:'rgba(96,165,250,0.6)' }} />
                  </div>
                </motion.div>
              )
            })}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)' }} />
          </div>
        </div>
      </section>

      {/* ══════════ OUR STORY / TIMELINE ══════════ */}
      <section style={{
        position:'relative', padding:'clamp(64px,8vw,112px) 0',
        background:BGA, overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="pg-orb" style={{ bottom:60, right:'-10%', width:400, height:400, background:'radial-gradient(circle,rgba(139,92,246,.07) 0%,transparent 70%)' }} />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left sticky */}
            <div className="lg:sticky lg:top-28">
              <p style={LBL}>Our story</p>
              <h2 style={HD}>
                <span style={wT}>How we got here, and </span>
                <span style={gT}>where we&apos;re going.</span>
              </h2>
              <p style={{ ...BD, marginTop:16, maxWidth:420, fontSize:14 }}>
                StandoutDev started small and stayed focused. Here&apos;s the honest version of our journey —
                no exaggeration, no hype.
              </p>

              {/* Current focus card */}
              <div style={{
                marginTop:28, padding:'clamp(16px,2.5vw,24px)',
                borderRadius:16, border:'1px solid rgba(255,255,255,0.06)',
                background:'rgba(255,255,255,0.02)',
              }}>
                <p style={{ fontSize:11, fontWeight:700, color:'rgba(96,165,250,0.6)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10 }}>
                  What we&apos;re focused on now
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {[
                    'Delivering measurable results for every client',
                    'Building in public — showing our process',
                    'Expanding into SaaS and product design',
                    'Keeping every engagement personal',
                  ].map((f) => (
                    <div key={f} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                      <div style={{ width:5, height:5, borderRadius:'50%', background:'rgba(96,165,250,0.5)', flexShrink:0, marginTop:5 }} />
                      <span style={{ fontSize:13, color:'rgba(255,255,255,0.55)', lineHeight:1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right timeline */}
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {milestones.map((m, i) => (
                <motion.div
                  key={m.y}
                  initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:'-60px' }}
                  transition={{ duration:0.65, delay:i*0.07, ease:E }}
                  style={{
                    display:'flex', gap:'clamp(16px,3vw,32px)',
                    paddingBottom:'clamp(24px,4vw,40px)',
                    marginBottom:'clamp(24px,4vw,40px)',
                    borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  {/* Year badge */}
                  <div style={{ flexShrink:0 }}>
                    <div style={{
                      padding:'6px 14px', borderRadius:100,
                      background:'rgba(96,165,250,0.08)',
                      border:'1px solid rgba(96,165,250,0.15)',
                      fontFamily:'monospace', fontSize:12, fontWeight:700,
                      color:'rgba(96,165,250,0.8)', whiteSpace:'nowrap',
                    }}>
                      {m.y}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 style={{
                      fontSize:'clamp(1rem,2vw,1.35rem)', fontWeight:800,
                      color:'rgba(255,255,255,0.92)', marginBottom:8,
                      letterSpacing:'-0.02em',
                    }}>
                      {m.t}
                    </h3>
                    <p style={{ ...BD, fontSize:13 }}>{m.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ VALUES ══════════ */}
      <section style={{
        position:'relative', padding:'clamp(64px,8vw,112px) 0',
        background:BG, overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="pg-orb" style={{ top:80, right:'-8%', width:360, height:360, background:'radial-gradient(circle,rgba(37,99,235,.07) 0%,transparent 70%)' }} />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center" style={{ marginBottom:'clamp(32px,5vw,56px)' }}>
            <p style={LBL}>What we believe</p>
            <h2 style={{ ...HD, maxWidth:600, margin:'0 auto' }}>
              <span style={wT}>Values that show up </span>
              <span style={gT}>in the work.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.t}
                  initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-40px' }}
                  transition={{ duration:0.6, delay:i*0.05, ease:E }}
                  style={{
                    borderRadius:16, border:'1px solid rgba(255,255,255,0.06)',
                    background:'rgba(255,255,255,0.02)',
                    padding:'clamp(18px,2.5vw,28px)',
                    transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  className="hover:bg-white/[0.04] hover:border-white/[0.1] hover:-translate-y-0.5"
                >
                  <Icon className="h-5 w-5 mb-4" style={{ color:'rgba(96,165,250,0.7)' }} />
                  <h3 style={{ fontSize:16, fontWeight:700, marginBottom:6, color:'rgba(255,255,255,0.92)' }}>
                    {v.t}
                  </h3>
                  <p style={{ color:'rgba(255,255,255,0.42)', lineHeight:1.6, fontSize:13 }}>{v.d}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section style={{
        position:'relative', padding:'clamp(64px,8vw,112px) 0',
        background:BGA, overflow:'hidden',
        borderTop:'1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center" style={{ marginBottom:'clamp(32px,5vw,56px)' }}>
            <p style={LBL}>From our clients</p>
            <h2 style={{ ...HD, maxWidth:640, margin:'0 auto' }}>
              <span style={wT}>What it&apos;s like to </span>
              <span style={gT}>work with us.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7, delay:i*0.08, ease:E }}
                style={{
                  borderRadius:20, padding:'clamp(22px,3vw,32px)',
                  border:'1px solid rgba(255,255,255,0.06)',
                  background:'rgba(255,255,255,0.02)',
                  position:'relative', overflow:'hidden',
                  display:'flex', flexDirection:'column',
                  transition:'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}
                className="hover:bg-white/[0.04] hover:border-white/[0.1] hover:-translate-y-0.5"
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${t.c}`} style={{ opacity:0.55 }} />

                <div style={{ display:'flex', gap:2, marginBottom:14 }}>
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5" style={{ fill:'#60a5fa', color:'#60a5fa' }} />
                  ))}
                </div>

                <p style={{
                  fontSize:13, lineHeight:1.7,
                  color:'rgba(255,255,255,0.72)', flex:1,
                  marginBottom:18, fontStyle:'italic',
                }}>
                  &ldquo;{t.q}&rdquo;
                </p>

                <div style={{ height:1, background:'rgba(255,255,255,0.06)', marginBottom:16 }} />

                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div
                    className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.c} flex items-center justify-center flex-shrink-0`}
                    style={{ fontWeight:800, color:'#020617', fontSize:13 }}
                  >
                    {t.letter}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13, color:'rgba(255,255,255,0.9)' }}>{t.n}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{t.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section style={{ position:'relative', padding:'clamp(64px,8vw,112px) 0', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,#0a1a35 0%,#050d1f 40%,#020617 100%)' }} />
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(148,163,184,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.02) 1px,transparent 1px)',
          backgroundSize:'60px 60px',
          maskImage:'radial-gradient(ellipse at center,black 20%,transparent 70%)',
          WebkitMaskImage:'radial-gradient(ellipse at center,black 20%,transparent 70%)',
          pointerEvents:'none', opacity:0.12,
        }} />
        <div className="pg-orb" style={{
          top:30, left:'25%', width:200, height:200,
          background:'radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)',
          animation:'soft-pulse 7s ease-in-out infinite',
        }} />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity:0, y:25 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.8, ease:E }}
          >
            <p style={LBL}>Ready to work together?</p>
            <h2 style={HD}>
              <span style={wT}>Let&apos;s build something </span>
              <br />
              <span style={gT}>that stands out.</span>
            </h2>
            <p style={{ ...BD, marginTop:18, maxWidth:460, marginLeft:'auto', marginRight:'auto', fontSize:14 }}>
              30-minute free consultation to understand your project, define scope,
              and map the fastest path to launch.
            </p>
            <div style={{ marginTop:28, display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/contact" style={{
                display:'inline-flex', alignItems:'center', gap:7,
                borderRadius:100, padding:'13px 26px', fontWeight:600, fontSize:14,
                background:'linear-gradient(135deg,#2563eb,#0891b2)', color:'#fff',
                boxShadow:'0 4px 24px rgba(59,130,246,.32)',
                transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)', textDecoration:'none',
              }}>
                Book Free Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/work" style={{
                display:'inline-flex', alignItems:'center', gap:6,
                borderRadius:100, padding:'13px 22px', fontWeight:600, fontSize:14,
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'rgba(255,255,255,0.7)', textDecoration:'none',
                transition:'all 0.45s cubic-bezier(0.22,1,0.36,1)',
              }}>
                View Our Work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p style={{ marginTop:18, fontSize:11, color:'rgba(255,255,255,0.2)' }}>
              standoutdevsolutions@gmail.com &bull; Reply within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About