'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Sparkles, Layers, Cpu, Rocket, Wand2, Zap, Plus, Minus, Quote, Star, Award, Github, Figma, Code, Palette as PaletteIcon, Globe, ShoppingBag, Building2, Landmark, Music, Gamepad2, Stethoscope, GraduationCap } from 'lucide-react'
import CinematicLaptop from '@/components/site/CinematicLaptop'

const logos = ['Northline', 'Vertex', 'Kairo', 'Halcyon', 'Obscura', 'Prism', 'Lumen', 'Nova', 'Argon', 'Ember']

const capabilities = [
  { icon: Wand2, title: 'Brand Systems', desc: 'Identity, guidelines, and visual languages that scale from favicon to flagship keynote.' },
  { icon: Layers, title: 'Digital Products', desc: 'Web apps and marketing sites that ship fast and feel like an experience, not a page.' },
  { icon: Cpu, title: 'Motion & 3D', desc: 'WebGL, Three.js, and scroll-driven cinema. We make the web feel like a film.' },
  { icon: Rocket, title: 'Launch Ops', desc: 'Positioning, launch strategy, and the assets you need to make a category-defining debut.' },
  { icon: Sparkles, title: 'AI Interfaces', desc: 'From chat surfaces to agentic workflows — UX for the next generation of software.' },
  { icon: Zap, title: 'Design Engineering', desc: 'A hybrid team that speaks Figma and Next.js. Nothing gets lost in the handoff.' },
]

const work = [
  { title: 'Halcyon Labs', tag: 'Brand · Web', color: 'from-blue-500 to-cyan-400' },
  { title: 'Northline OS', tag: 'Product · Motion', color: 'from-violet-500 to-blue-500' },
  { title: 'Prism Cloud', tag: 'Marketing site', color: 'from-cyan-400 to-emerald-400' },
  { title: 'Nova AI', tag: 'Product · AI UX', color: 'from-pink-500 to-violet-500' },
]

const testimonials = [
  { q: 'They shipped a marketing site that made our seed round feel like a Series C. The scroll animation alone is worth the price.', n: 'Sofia Ren', r: 'Co-founder, Halcyon Labs', c: 'from-blue-500 to-cyan-400' },
  { q: 'The team operates like a design engineering hive-mind. Figma to production in days, not months. Absurd taste.', n: 'Marcus Vale', r: 'Head of Product, Northline', c: 'from-violet-500 to-blue-500' },
  { q: 'We hired them to build a landing page. They gave us a category. The launch trended on Product Hunt for a week.', n: 'Ava Chen', r: 'CEO, Prism Cloud', c: 'from-cyan-400 to-emerald-400' },
  { q: "I've worked with a dozen studios. Standoutdev is the only one where every deliverable made me want to send it to friends.", n: 'Rio Okafor', r: 'Founder, Nova AI', c: 'from-pink-500 to-violet-500' },
]

const philosophy = [
  { k: 'Craft', t: 'The details compound.', d: 'A great product is a million tiny decisions made with taste. We sweat every one.' },
  { k: 'Speed', t: 'Move like a startup.', d: 'Two-week sprints. Weekly reviews. No 6-month decks. We ship.' },
  { k: 'Story', t: 'Everything is a scene.', d: 'From hero to footer, from tagline to tooltip — we choreograph the whole experience.' },
]

const stack = [
  { n: 'Next.js', d: 'App Router, RSC, edge' },
  { n: 'React', d: 'v18 & v19 canary' },
  { n: 'Three.js', d: 'WebGL, R3F, Drei' },
  { n: 'Framer Motion', d: 'Scroll & spring' },
  { n: 'GSAP', d: 'ScrollTrigger, Flip' },
  { n: 'Tailwind', d: 'Design tokens' },
  { n: 'Figma', d: 'Systems & specs' },
  { n: 'Rive', d: 'Interactive motion' },
  { n: 'Sanity', d: 'Headless CMS' },
  { n: 'Vercel', d: 'Ship on the edge' },
  { n: 'Supabase', d: 'DB, auth, storage' },
  { n: 'OpenAI', d: 'GPT-5, agents' },
]

const industries = [
  { icon: Building2, t: 'SaaS & Dev tools' },
  { icon: Landmark, t: 'Fintech & Web3' },
  { icon: Stethoscope, t: 'Health & Bio' },
  { icon: ShoppingBag, t: 'Commerce & DTC' },
  { icon: Music, t: 'Media & Culture' },
  { icon: Gamepad2, t: 'Gaming & AR/VR' },
  { icon: GraduationCap, t: 'Learning' },
  { icon: Globe, t: 'Climate & Impact' },
]

const insights = [
  { tag: 'Motion', t: 'The physics of a great scroll animation', d: 'A field guide to spring damping, easing curves, and the invisible math behind cinematic feel.', min: 8 },
  { tag: 'Design Engineering', t: 'Why your design system should ship as code', d: 'Figma is where systems die. Real systems live in your monorepo, versioned like anything else.', min: 6 },
  { tag: 'AI', t: 'Designing for streaming, not screens', d: 'Latency is the new pixel. How to build interfaces that feel alive when responses arrive token by token.', min: 10 },
]

const faqs = [
  { q: 'How long does a typical engagement take?', a: 'Marketing sites and brand launches run 6\u201310 weeks. Full product engagements are usually 3\u20136 months. We scope tightly and ship in phases.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes — roughly half our work is pre-Series-A. We love shaping v1 with founders who care about how their thing feels.' },
  { q: 'What tech stack do you build in?', a: 'Next.js, React, Three.js, and Framer Motion for the front. Sanity or Payload for content. Vercel for hosting. We fit into your stack when you have one.' },
  { q: 'Do you offer ongoing support after launch?', a: 'Absolutely. Most clients continue with us on a retainer for evolution, campaigns, and new features.' },
  { q: 'Can you work with our in-house team?', a: 'Yes — we frequently embed with in-house design and eng teams. We can lead, support, or pair, depending on your needs.' },
  { q: 'How do you handle pricing?', a: "We scope each engagement based on ambition and outcomes, not hours. We'll share a range on the first call and a firm number after discovery." },
]

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(i === 0)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="border-t border-white/10"
    >
      <button onClick={() => setOpen(!open)} className="w-full py-6 flex items-center justify-between text-left gap-6 group">
        <span className="font-display text-xl md:text-2xl font-semibold group-hover:text-cyan-300 transition-colors">{q}</span>
        <span className={`shrink-0 h-10 w-10 rounded-full border border-white/15 flex items-center justify-center transition-transform ${open ? 'bg-cyan-300 text-[#0a0e27] border-cyan-300 rotate-180' : ''}`}>
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div className={`grid transition-all duration-500 ${open ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-white/60 leading-relaxed max-w-3xl">{a}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Home() {
  return (
    <>
      <CinematicLaptop />

      {/* Logo marquee */}
      <section className="relative py-16 border-y border-white/5 bg-[#080b23]">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-white/40 mb-8">Trusted by teams shipping the future</p>
        <div className="overflow-hidden">
          <div className="marquee-track gap-16 pr-16">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="font-display text-3xl md:text-4xl font-semibold text-white/30 hover:text-white transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
            <div className="md:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">What we do</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]">
                A studio built for the<br/><span className="grad-text">next chapter of the web.</span>
              </h2>
            </div>
            <div className="md:col-span-5 text-white/60 leading-relaxed text-lg">
              We partner with ambitious founders and product teams to design and engineer brands, sites, and software that break through the noise. Every project is an exercise in taste, craft, and technical rigor.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.7,0,0.2,1] }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition"
                >
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-8 w-8 text-cyan-300 mb-6" />
                  <h3 className="font-display text-2xl font-semibold mb-3">{c.title}</h3>
                  <p className="text-white/60 leading-relaxed">{c.desc}</p>
                  <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-white/30 group-hover:text-cyan-300 transition" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="relative py-24 border-y border-white/5 bg-gradient-to-b from-[#080b23] to-[#0a0e27]">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { k: '80+', v: 'Products shipped' },
            { k: '12', v: 'Awwwards & FWA nods' },
            { k: '4.9', v: 'Avg client rating' },
            { k: '30d', v: 'From brief to launch' },
          ].map(s => (
            <div key={s.v}>
              <div className="font-display text-5xl md:text-6xl font-bold grad-text">{s.k}</div>
              <div className="mt-2 text-sm text-white/50">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Work preview */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Selected work</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold">Recent <span className="grad-text">obsessions.</span></h2>
            </div>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold link-underline">View all work <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {work.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.7,0,0.2,1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/3] cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${w.color} opacity-80`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,39,0.6)_100%)]" />
                <div className="absolute inset-0 grid-lines opacity-25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-64 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-xs uppercase tracking-widest text-white/70">{w.tag}</div>
                  <div className="font-display text-3xl md:text-4xl font-bold mt-1">{w.title}</div>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 h-6 w-6 opacity-80 group-hover:rotate-45 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy manifesto */}
      <section className="relative py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Our philosophy</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] max-w-4xl">
            We don't make websites.<br/><span className="grad-text">We make first impressions</span> that last decades.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {philosophy.map((p, i) => (
              <motion.div key={p.k}
                initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6, delay: i*0.1}}
                className="relative border-l-2 border-cyan-400/40 pl-6"
              >
                <div className="text-xs font-mono uppercase tracking-widest text-cyan-300/80 mb-3">{p.k}</div>
                <h3 className="font-display text-3xl font-bold mb-3">{p.t}</h3>
                <p className="text-white/60 leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-32 bg-[#080b23] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Kind words</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold">Founders <span className="grad-text">love us.</span></h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_,i)=><Star key={i} className="h-5 w-5 fill-cyan-300 text-cyan-300" />)}
              <span className="ml-2 text-white/60 text-sm">4.9 / 5 avg across 40+ projects</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.n}
                initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-80px'}} transition={{duration:0.6, delay: i*0.06}}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 group hover:bg-white/[0.04] transition"
              >
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${t.c} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                <Quote className="h-10 w-10 text-cyan-300/60 mb-6" />
                <p className="text-xl md:text-2xl leading-snug font-display font-medium">{t.q}</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${t.c}`} />
                  <div>
                    <div className="font-semibold">{t.n}</div>
                    <div className="text-sm text-white/50">{t.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
            <div className="md:col-span-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">The toolkit</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.02]">Best-in-class<br/><span className="grad-text">tech, only.</span></h2>
            </div>
            <p className="md:col-span-5 md:col-start-8 text-white/60 leading-relaxed text-lg">
              We use modern, opinionated tools that let us move fast without shipping mediocrity. No jQuery. No WordPress. No excuses.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {stack.map((s, i) => (
              <motion.div key={s.n}
                initial={{opacity:0, scale:0.9}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.4, delay: i*0.03}}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-cyan-300/50 hover:bg-cyan-300/5 transition-all"
              >
                <div className="font-display font-semibold text-lg">{s.n}</div>
                <div className="text-xs text-white/40 mt-1">{s.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative py-32 border-y border-white/5 bg-[#080b23]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Industries we love</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold">Built for teams<br/>redefining <span className="grad-text">their category.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((it, i) => {
              const Icon = it.icon
              return (
                <motion.div key={it.t}
                  initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.05}}
                  className="group aspect-square rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-400/5 transition-all"
                >
                  <Icon className="h-8 w-8 text-cyan-300 group-hover:scale-110 transition-transform" />
                  <div className="font-display text-xl font-semibold leading-tight">{it.t}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Insights / Blog teaser */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">From the studio</p>
              <h2 className="font-display text-5xl md:text-7xl font-bold">Insights & <span className="grad-text">field notes.</span></h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold link-underline">All writing <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {insights.map((p, i) => (
              <motion.a key={p.t} href="#"
                initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6, delay:i*0.08}}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition"
              >
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-400/30 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 grid-lines opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-display text-4xl font-bold text-white/20">0{i+1}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/50 mb-3">
                  <span>{p.tag}</span><span>·</span><span>{p.min} min read</span>
                </div>
                <h3 className="font-display text-2xl font-bold group-hover:grad-text transition-all">{p.t}</h3>
                <p className="mt-3 text-white/60 leading-relaxed text-sm">{p.d}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">Read article <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" /></div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="relative py-24 border-y border-white/5 bg-[#080b23]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-10">
            <Award className="h-6 w-6 text-cyan-300" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Recognition</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { y: '2025', a: 'Awwwards SOTD ×3', c: 'Halcyon, Northline, Prism' },
              { y: '2024', a: 'FWA of the Day ×2', c: 'Nova AI, Ember' },
              { y: '2024', a: 'CSS Design Awards', c: 'Innovation & UX' },
              { y: '2023', a: 'Webby Nominee', c: 'Best Visual Design' },
            ].map((w,i) => (
              <motion.div key={w.a}
                initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.06}}
                className="border-l-2 border-cyan-400/40 pl-4"
              >
                <div className="font-mono text-xs text-cyan-300/80 mb-2">{w.y}</div>
                <div className="font-display text-xl font-semibold">{w.a}</div>
                <div className="text-sm text-white/50 mt-1">{w.c}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Frequently asked</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold">The <span className="grad-text">questions</span> we get.</h2>
          </div>
          <div>
            {faqs.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} i={i} />)}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-70" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-6">Let's build something legendary</p>
          <h2 className="font-display text-5xl md:text-8xl font-bold leading-[0.95]">Ready to <span className="grad-text">stand out?</span></h2>
          <p className="mt-8 text-white/60 text-lg max-w-2xl mx-auto">We take on a limited number of projects each quarter. If you're building something that deserves to be remembered, tell us the story.</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white text-[#0a0e27] px-8 py-4 font-semibold hover:scale-[1.03] transition">
              Start a project <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition" />
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold hover:bg-white/5 transition">See our work</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home