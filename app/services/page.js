'use client'

import { useState, memo, useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight, ArrowRight, Palette, Code2, Play, Rocket, Brain, Cpu,
  Globe, Smartphone, ShoppingCart, LayoutDashboard, Layers, PenTool,
  MonitorPlay, Clapperboard, CheckCircle, Star, Zap, Target, Users,
  Clock, Shield, HeartHandshake, MessagesSquare, Search, Eye,
  FlaskConical, Sparkles, TrendingUp, Award,
} from 'lucide-react'

/* ============================================
   CONSTANTS
============================================ */
const E = [0.22, 1, 0.36, 1]
const BG = '#020617'
const BGA = '#050d1f'
const gT = { background: 'linear-gradient(135deg,#60a5fa 0%,#06b6d4 50%,#818cf8 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }
const wT = { background: 'linear-gradient(180deg,#fff 0%,#cbd5e1 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }

/* ============================================
   SERVICES DATA — Real offerings
============================================ */
const services = [
  {
    icon: PenTool,
    k: '01',
    t: 'Brand & Identity Design',
    d: 'We craft complete brand systems that resonate with your audience and differentiate you from competitors. From logo design to comprehensive brand guidelines.',
    deliverables: ['Logo & mark design', 'Color & typography system', 'Brand guidelines document', 'Social media templates'],
    color: 'from-violet-500 to-purple-600',
    colorRgb: '139,92,246',
    stat: { v: '15+', l: 'Brands crafted' },
  },
  {
    icon: Palette,
    k: '02',
    t: 'UI/UX Design',
    d: 'User-centered design that converts. We research, wireframe, prototype, and test — so every screen serves a purpose and every interaction feels intentional.',
    deliverables: ['User research & personas', 'Wireframes & user flows', 'High-fidelity UI design', 'Interactive prototypes'],
    color: 'from-blue-500 to-cyan-500',
    colorRgb: '59,130,246',
    stat: { v: '95%', l: 'Client satisfaction' },
  },
  {
    icon: Code2,
    k: '03',
    t: 'Web Development',
    d: 'Full-stack development with Next.js, React, and modern frameworks. We build fast, accessible, SEO-optimized websites that perform flawlessly across all devices.',
    deliverables: ['Next.js / React builds', 'API & backend integration', 'CMS setup (Sanity, Strapi)', 'Performance optimization'],
    color: 'from-cyan-400 to-emerald-400',
    colorRgb: '6,182,212',
    stat: { v: '100', l: 'Lighthouse score' },
  },
  {
    icon: Globe,
    k: '04',
    t: 'Marketing Websites',
    d: 'High-conversion marketing sites that tell your story and drive action. Built with cinematic animations, responsive design, and conversion-focused layouts.',
    deliverables: ['Landing page design', 'Conversion optimization', 'A/B test frameworks', 'Analytics & tracking'],
    color: 'from-emerald-400 to-teal-500',
    colorRgb: '52,211,153',
    stat: { v: '3×', l: 'Avg conversion lift' },
  },
  {
    icon: Clapperboard,
    k: '05',
    t: 'Motion & Animation',
    d: 'Scroll-driven animations, micro-interactions, and motion design that bring your digital product to life. Using Framer Motion, GSAP, and Lottie.',
    deliverables: ['Scroll animations', 'Micro-interactions', 'Loading & transition effects', 'Animated illustrations'],
    color: 'from-amber-400 to-orange-500',
    colorRgb: '251,191,36',
    stat: { v: '60%', l: 'More engagement' },
  },
  {
    icon: LayoutDashboard,
    k: '06',
    t: 'SaaS & Dashboard Design',
    d: 'Complex data, simple interfaces. We design dashboards, admin panels, and SaaS platforms that users actually enjoy using and that reduce support tickets.',
    deliverables: ['Dashboard UI design', 'Data visualization', 'Component design system', 'User onboarding flows'],
    color: 'from-indigo-500 to-violet-500',
    colorRgb: '99,102,241',
    stat: { v: '40%', l: 'Fewer support tickets' },
  },
  {
    icon: ShoppingCart,
    k: '07',
    t: 'E-Commerce & Shopify',
    d: 'Commerce experiences built for conversion. Custom Shopify themes, optimized checkout flows, and product pages that turn browsers into buyers.',
    deliverables: ['Custom Shopify themes', 'Product page optimization', 'Checkout flow design', 'Inventory & CMS setup'],
    color: 'from-pink-500 to-rose-500',
    colorRgb: '236,72,153',
    stat: { v: '2.5×', l: 'Revenue increase' },
  },
  {
    icon: Smartphone,
    k: '08',
    t: 'Mobile App Design',
    d: 'Native-feel mobile experiences for iOS and Android. From concept to polished UI — designed for retention, engagement, and app store success.',
    deliverables: ['iOS & Android UI', 'Gesture & interaction design', 'App store assets', 'Usability testing'],
    color: 'from-sky-400 to-blue-500',
    colorRgb: '56,189,248',
    stat: { v: '4.8★', l: 'Avg app rating' },
  },
]

/* ============================================
   PROCESS DATA — Our actual workflow
============================================ */
const process = [
  {
    k: '01',
    t: 'Discovery & Strategy',
    d: 'We start with a focused workshop to understand your goals, audience, and competitive landscape. You get a clear project roadmap within 48 hours.',
    icon: Search,
    color: 'from-blue-500 to-cyan-400',
    duration: 'Week 1',
    output: 'Project brief & strategy deck',
  },
  {
    k: '02',
    t: 'Research & Direction',
    d: 'Competitive analysis, user research, and moodboarding. We present 2–3 creative directions and align on the vision before a single pixel is designed.',
    icon: Eye,
    color: 'from-violet-500 to-blue-500',
    duration: 'Week 1–2',
    output: 'Research report & creative direction',
  },
  {
    k: '03',
    t: 'Design & Prototype',
    d: 'High-fidelity designs, component libraries, and interactive prototypes. Weekly reviews ensure we stay aligned and iterate quickly.',
    icon: Palette,
    color: 'from-cyan-400 to-emerald-400',
    duration: 'Week 2–4',
    output: 'Figma files & interactive prototype',
  },
  {
    k: '04',
    t: 'Development & Build',
    d: 'Clean, performant code in Next.js with Tailwind CSS. Built with performance budgets, accessibility standards, and SEO best practices.',
    icon: Code2,
    color: 'from-emerald-400 to-teal-500',
    duration: 'Week 3–6',
    output: 'Production-ready codebase',
  },
  {
    k: '05',
    t: 'QA & Testing',
    d: 'Cross-browser testing, performance audits, accessibility checks, and real-device testing. Nothing ships until it hits our quality bar.',
    icon: FlaskConical,
    color: 'from-amber-400 to-orange-500',
    duration: 'Week 5–6',
    output: 'QA report & bug-free build',
  },
  {
    k: '06',
    t: 'Launch & Optimize',
    d: 'Deployment to Vercel, monitoring setup, and post-launch optimization. We track performance and iterate based on real user data.',
    icon: Rocket,
    color: 'from-pink-500 to-violet-500',
    duration: 'Week 6+',
    output: 'Live site & analytics dashboard',
  },
]

/* ============================================
   WHY US — Real differentiators
============================================ */
const whyUs = [
  { icon: Zap, title: 'Ship in weeks, not months', desc: 'Most projects launch in 4–8 weeks. We move fast without cutting corners.' },
  { icon: Target, title: 'Conversion-focused design', desc: 'Every design decision is backed by user research and conversion data.' },
  { icon: Shield, title: '100% ownership', desc: 'You own everything — code, designs, assets. No lock-in, no recurring fees.' },
  { icon: MessagesSquare, title: 'Direct communication', desc: 'Talk directly to the people doing the work. No account managers in between.' },
  { icon: TrendingUp, title: 'Measurable results', desc: 'We track what matters: load time, conversion rate, bounce rate, revenue.' },
  { icon: HeartHandshake, title: 'Long-term partnership', desc: 'Most clients stay with us after launch for iterations and new features.' },
]

/* ============================================
   REAL TESTIMONIALS
============================================ */
const testimonials = [
  {
    q: 'StandoutDev transformed our online presence completely. The new website tripled our inquiry rate within the first month. Professional, fast, and exactly what we needed.',
    n: 'Uma Metal Craft',
    r: 'Manufacturing, Rajkot',
    c: 'from-amber-500 to-orange-600',
    letter: 'U',
    result: '3× more inquiries',
  },
  {
    q: "Students and parents love the platform. It loads instantly, looks professional, and enrollment went up significantly after launch. Best decision we made.",
    n: 'Siddhanath Krupa Physics',
    r: 'Education Institute',
    c: 'from-blue-500 to-indigo-600',
    letter: 'S',
    result: '150+ students enrolled',
  },
  {
    q: 'The result exceeded every expectation. Cinematic animations, perfect performance scores, and clients now call us premium. Worth every rupee.',
    n: 'Digital Developers',
    r: 'Digital Agency',
    c: 'from-violet-500 to-purple-600',
    letter: 'D',
    result: '5× lead generation',
  },
]

/* ============================================
   TECH STACK — What we actually use
============================================ */
const techStack = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Three.js', category: '3D / WebGL' },
  { name: 'Figma', category: 'Design' },
  { name: 'Vercel', category: 'Hosting' },
  { name: 'Sanity', category: 'CMS' },
  { name: 'Shopify', category: 'Commerce' },
  { name: 'Webflow', category: 'No-Code' },
  { name: 'WordPress', category: 'CMS' },
]

/* ============================================
   PRICING TIERS — Transparent ranges
============================================ */
const pricing = [
  {
    tier: 'Starter',
    price: '₹25K–50K',
    timeline: '2–3 weeks',
    desc: 'Perfect for landing pages, personal portfolios, or single-page marketing sites.',
    features: ['Single page website', 'Responsive design', 'Basic animations', 'Contact form', 'SEO setup', '1 revision round'],
    color: 'from-blue-500 to-cyan-500',
    colorRgb: '59,130,246',
    popular: false,
  },
  {
    tier: 'Professional',
    price: '₹50K–1.5L',
    timeline: '4–6 weeks',
    desc: 'Multi-page websites with CMS, animations, and conversion optimization. Our most popular tier.',
    features: ['Up to 8 pages', 'CMS integration', 'Advanced animations', 'SEO & performance audit', 'Analytics setup', '3 revision rounds', 'Post-launch support'],
    color: 'from-violet-500 to-purple-500',
    colorRgb: '139,92,246',
    popular: true,
  },
  {
    tier: 'Enterprise',
    price: '₹1.5L+',
    timeline: '6–12 weeks',
    desc: 'Full-scale web apps, SaaS platforms, e-commerce stores, or complex custom builds.',
    features: ['Unlimited pages', 'Custom web application', 'E-commerce / SaaS', 'Design system', 'API integration', 'Ongoing support', 'Priority communication'],
    color: 'from-amber-500 to-orange-500',
    colorRgb: '245,158,11',
    popular: false,
  },
]

/* ============================================
   SERVICE CARD COMPONENT
============================================ */
const ServiceCard = memo(function ServiceCard({ s, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const Icon = s.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.06, ease: E }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        border: `1px solid ${hovered ? `rgba(${s.colorRgb},0.2)` : 'rgba(255,255,255,0.06)'}`,
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        padding: 'clamp(24px,3vw,36px)',
        transition: 'all 0.55s cubic-bezier(0.22,1,0.36,1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px -12px rgba(${s.colorRgb},0.15)` : 'none',
      }}
    >
      {/* Glow blob */}
      <div
        className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${s.color}`}
        style={{
          opacity: hovered ? 0.08 : 0.03,
          filter: 'blur(40px)',
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.color}`}
        style={{ opacity: hovered ? 0.7 : 0.3, transition: 'opacity 0.5s ease' }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            className={`bg-gradient-to-br ${s.color}`}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon className="h-5 w-5" style={{ color: '#020617' }} />
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              fontWeight: 700,
              color: `rgba(${s.colorRgb},0.5)`,
            }}
          >
            {s.k}
          </span>
        </div>

        {/* Stat badge */}
        <div
          style={{
            padding: '5px 12px',
            borderRadius: 100,
            background: `rgba(${s.colorRgb},0.08)`,
            border: `1px solid rgba(${s.colorRgb},0.15)`,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              background: `linear-gradient(135deg, rgba(${s.colorRgb},1) 0%, #fff 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {s.stat.v}
          </span>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {s.stat.l}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(1.25rem,2.5vw,1.65rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 8,
          color: 'rgba(255,255,255,0.95)',
        }}
      >
        {s.t}
      </h3>

      {/* Description */}
      <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontSize: 13, marginBottom: 18, maxWidth: 420 }}>
        {s.d}
      </p>

      {/* Deliverables */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {s.deliverables.map((d) => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: `rgba(${s.colorRgb},0.6)`,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{d}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
})

/* ============================================
   PROCESS STEP COMPONENT
============================================ */
const ProcessStep = memo(function ProcessStep({ step, i, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.08, ease: E }}
      style={{
        display: 'flex',
        gap: 'clamp(14px,2.5vw,28px)',
        alignItems: 'flex-start',
        marginBottom: i < total - 1 ? 'clamp(28px,4vw,48px)' : 0,
      }}
    >
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 50 }}>
        <div
          className={`bg-gradient-to-br ${step.color}`}
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 20px rgba(96,165,250,0.2)`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: '#020617' }} />
        </div>
        {i < total - 1 && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 32,
              background: 'linear-gradient(180deg, rgba(96,165,250,0.25) 0%, rgba(96,165,250,0.04) 100%)',
              borderRadius: 100,
              marginTop: 6,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: 'rgba(96,165,250,0.5)' }}>
            {step.k}
          </span>
          <div style={{ height: 1, width: 16, background: 'rgba(255,255,255,0.07)' }} />
          <span
            style={{
              fontSize: 9,
              padding: '2px 8px',
              borderRadius: 100,
              background: 'rgba(96,165,250,0.08)',
              border: '1px solid rgba(96,165,250,0.15)',
              color: 'rgba(96,165,250,0.7)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {step.duration}
          </span>
        </div>
        <h3 style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 800, marginBottom: 6, color: 'rgba(255,255,255,0.95)' }}>
          {step.t}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, fontSize: 13, maxWidth: 420, marginBottom: 8 }}>
          {step.d}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            padding: '4px 10px',
            borderRadius: 100,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <CheckCircle className="h-3 w-3" style={{ color: 'rgba(96,165,250,0.5)' }} />
          {step.output}
        </div>
      </div>
    </motion.div>
  )
})

/* ============================================
   SHIMMER TEXT
============================================ */
const ShimmerText = memo(function ShimmerText({ children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <motion.span
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          backgroundImage: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          pointerEvents: 'none',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  )
})

/* ============================================
   PAGE
============================================ */
function Services() {
  return (
    <>
      <style jsx global>{`
        @keyframes soft-pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
        .pg-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(120px,18vw,180px)',
          paddingBottom: 'clamp(64px,8vw,100px)',
          overflow: 'hidden',
          background: BG,
        }}
      >
        {/* Orbs */}
        <div
          className="pg-orb"
          style={{ top: '-10%', left: '10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(37,99,235,.15) 0%,transparent 70%)' }}
        />
        <div
          className="pg-orb"
          style={{ bottom: '-5%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%)' }}
        />

        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(148,163,184,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.025) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center,black 20%,transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center,black 20%,transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: E }}
            style={{ marginBottom: 24 }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 16px 7px 7px',
                borderRadius: 100,
                background: 'rgba(255,255,255,.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,.06)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#06b6d4',
                  boxShadow: '0 0 8px rgba(6,182,212,.7)',
                  animation: 'soft-pulse 2.5s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', letterSpacing: '.12em', textTransform: 'uppercase' }}>
                Our Services
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: E }}
            style={{
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              fontSize: 'clamp(2.5rem,6vw,4.5rem)',
              marginBottom: 20,
            }}
          >
            <span style={wT}>Design, develop &</span>
            <br />
            <ShimmerText>
              <span style={gT}>launch — all in one studio.</span>
            </ShimmerText>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: E }}
            style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', maxWidth: 560, marginBottom: 32 }}
          >
            From brand strategy to production code — we handle every discipline in-house.
            No outsourcing, no miscommunication, no wasted time.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: E }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: 100,
                padding: '13px 26px',
                fontWeight: 600,
                fontSize: 14,
                background: 'linear-gradient(135deg,#2563eb,#0891b2)',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(59,130,246,0.3)',
                transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                borderRadius: 100,
                padding: '13px 24px',
                fontWeight: 600,
                fontSize: 14,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              View Our Work <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: E }}
            style={{
              display: 'flex',
              gap: 'clamp(16px,3vw,32px)',
              marginTop: 'clamp(40px,5vw,64px)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { v: '15+', l: 'Projects shipped' },
              { v: '95%', l: 'Satisfaction rate' },
              { v: '4–8', l: 'Weeks to launch' },
              { v: '100', l: 'Lighthouse avg' },
            ].map((s) => (
              <div key={s.l} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 900, ...gT }}>{s.v}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ ALL SERVICES ══════════ */}
      <section style={{ position: 'relative', padding: 'clamp(64px,8vw,112px) 0', background: BGA, overflow: 'hidden' }}>
        <div
          className="pg-orb"
          style={{ top: 100, right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 70%)' }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <div style={{ marginBottom: 'clamp(32px,5vw,56px)' }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: E }}
              style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600 }}
            >
              What we do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: E }}
              style={{ fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}
            >
              <span style={wT}>Everything your product needs, </span>
              <span style={gT}>under one roof.</span>
            </motion.h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <ServiceCard key={s.k} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section style={{ position: 'relative', padding: 'clamp(64px,8vw,112px) 0', background: BG, overflow: 'hidden' }}>
        <div
          className="pg-orb"
          style={{ bottom: 60, right: '-10%', width: 380, height: 380, background: 'radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 70%)' }}
        />
        <div
          className="pg-orb"
          style={{ top: 80, left: '-8%', width: 320, height: 320, background: 'radial-gradient(circle,rgba(6,182,212,.08) 0%,transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left — sticky */}
            <div className="lg:sticky lg:top-28">
              <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600 }}>
                Our process
              </p>
              <h2 style={{ fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
                <span style={wT}>From idea to live product </span>
                <span style={gT}>in 4–8 weeks.</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 14, marginTop: 16, maxWidth: 420 }}>
                Six focused phases with weekly check-ins, transparent timelines, and zero surprises.
                You&apos;ll know exactly where your project stands at every step.
              </p>

              {/* Trust signals */}
              <div
                style={{
                  marginTop: 28,
                  padding: 20,
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Clock className="h-4 w-4" style={{ color: 'rgba(96,165,250,0.7)' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Typical timeline</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { l: 'Landing pages', v: '2–3 weeks' },
                    { l: 'Marketing sites', v: '4–6 weeks' },
                    { l: 'Web applications', v: '6–10 weeks' },
                    { l: 'E-commerce', v: '4–8 weeks' },
                  ].map((t) => (
                    <div key={t.l}>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{t.l}</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{t.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    borderRadius: 100,
                    padding: '11px 22px',
                    fontWeight: 600,
                    fontSize: 13,
                    background: 'linear-gradient(135deg,#2563eb,#0891b2)',
                    color: '#fff',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.28)',
                    transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right — steps */}
            <div>
              {process.map((step, i) => (
                <ProcessStep key={step.k} step={step} i={i} total={process.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section style={{ position: 'relative', padding: 'clamp(64px,8vw,112px) 0', background: BGA, overflow: 'hidden' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center" style={{ marginBottom: 'clamp(32px,5vw,56px)' }}>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600 }}>
              Why StandoutDev
            </p>
            <h2 style={{ fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', fontSize: 'clamp(2rem,4.5vw,3.5rem)', maxWidth: 700, margin: '0 auto' }}>
              <span style={wT}>What makes us </span>
              <span style={gT}>different.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => {
              const Icon = w.icon
              return (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: E }}
                  style={{
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                    padding: 'clamp(20px,3vw,28px)',
                    transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  className="hover:bg-white/[0.04] hover:border-white/[0.1] hover:-translate-y-0.5"
                >
                  <Icon className="h-5 w-5 mb-4" style={{ color: '#60a5fa' }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>{w.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontSize: 13 }}>{w.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════ TECH STACK ══════════ */}
      <section style={{ position: 'relative', padding: 'clamp(56px,7vw,96px) 0', background: BG, overflow: 'hidden' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center" style={{ marginBottom: 'clamp(28px,4vw,48px)' }}>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600 }}>
              Tech stack
            </p>
            <h2 style={{ fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', fontSize: 'clamp(1.8rem,4vw,3rem)', maxWidth: 600, margin: '0 auto' }}>
              <span style={wT}>Built with tools that </span>
              <span style={gT}>perform.</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: E }}
                style={{
                  padding: '10px 18px',
                  borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.025)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.4s ease',
                }}
                className="hover:bg-white/[0.05] hover:border-white/[0.12]"
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{t.name}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {t.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section style={{ position: 'relative', padding: 'clamp(64px,8vw,112px) 0', background: BG, overflow: 'hidden' }}>
        <div
          className="pg-orb"
          style={{ top: 60, left: '-8%', width: 350, height: 350, background: 'radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%)' }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center" style={{ marginBottom: 'clamp(32px,5vw,56px)' }}>
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600 }}>
              Client results
            </p>
            <h2 style={{ fontWeight: 900, lineHeight: 1.02, letterSpacing: '-0.03em', fontSize: 'clamp(2rem,4.5vw,3.5rem)', maxWidth: 600, margin: '0 auto' }}>
              <span style={wT}>Don&apos;t take our word for it. </span>
              <span style={gT}>See the results.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: E }}
                style={{
                  borderRadius: 20,
                  padding: 'clamp(22px,3vw,32px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${t.c}`} style={{ opacity: 0.5 }} />

                {/* Result badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '5px 12px',
                    borderRadius: 100,
                    background: 'rgba(52,211,153,0.08)',
                    border: '1px solid rgba(52,211,153,0.15)',
                    marginBottom: 16,
                    width: 'fit-content',
                  }}
                >
                  <TrendingUp className="h-3 w-3" style={{ color: 'rgba(52,211,153,0.8)' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(52,211,153,0.9)' }}>{t.result}</span>
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5" style={{ fill: '#60a5fa', color: '#60a5fa' }} />
                  ))}
                </div>

                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.7)',
                    flex: 1,
                    marginBottom: 18,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{t.q}&rdquo;
                </p>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.c} flex items-center justify-center flex-shrink-0`}
                    style={{ fontWeight: 800, color: '#020617', fontSize: 13 }}
                  >
                    {t.letter}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>{t.n}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{t.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section style={{ position: 'relative', padding: 'clamp(64px,8vw,112px) 0', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%,#0a1a35 0%,#050d1f 40%,#020617 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(148,163,184,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.02) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center,black 20%,transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center,black 20%,transparent 70%)',
            pointerEvents: 'none',
            opacity: 0.12,
          }}
        />
        <div
          className="pg-orb"
          style={{
            top: 30,
            left: '25%',
            width: 200,
            height: 200,
            background: 'radial-gradient(circle,rgba(37,99,235,.18) 0%,transparent 70%)',
            animation: 'soft-pulse 7s ease-in-out infinite',
          }}
        />

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: E }}
          >
            <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(96,165,250,0.8)', marginBottom: 16, fontWeight: 600 }}>
              Ready to start?
            </p>
            <h2
              style={{
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                fontSize: 'clamp(2rem,4.5vw,3.5rem)',
              }}
            >
              <span style={wT}>Let&apos;s build something </span>
              <br />
              <span style={gT}>that stands out.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 14, marginTop: 18, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
              30-minute free consultation to understand your project, define scope, and map the fastest path to launch.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  borderRadius: 100,
                  padding: '13px 26px',
                  fontWeight: 600,
                  fontSize: 14,
                  background: 'linear-gradient(135deg,#2563eb,#0891b2)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(59,130,246,.32)',
                  transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                  textDecoration: 'none',
                }}
              >
                Book Free Consultation <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:standoutdevsolutions@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  borderRadius: 100,
                  padding: '13px 22px',
                  fontWeight: 600,
                  fontSize: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                Email Us
              </a>
            </div>
            <p style={{ marginTop: 18, fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
              standoutdevsolutions@gmail.com • Typically reply within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services